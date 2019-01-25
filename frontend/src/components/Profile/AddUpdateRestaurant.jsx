import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import {
  Fab,
  withStyles,
  Typography,
  Collapse,
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
  Select,
  ListItemText,
  MenuItem,
  Input,
  Checkbox,
  InputLabel,
  FormControl,
  Snackbar
} from "@material-ui/core";
import classnames from "classnames";

const styles = theme => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.unit * 2
  },
  fab: {
    transform: "scale(1)",
    transition: theme.transitions.create("transform")
  },
  fabDisabled: {
    transform: "scale(0)"
  },
  btns: {
    marginTop: theme.spacing.unit * 2
  },
  listItem: {
    textTransform: "capitalize"
  },
  snackbarSuccess: {
    backgroundColor: green[600]
  },
  snackbarError: {
    backgroundColor: amber[700]
  }
});

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250
    }
  }
};

class AddUpdateRestaurant extends React.Component {
  state = {
    name: "",
    address: "",
    phone: "",
    description: "",
    tags: [],
    allTags: [],
    formExpanded: false,
    snackbarOpen: false,
    isValid: true,
    success: false,
    snackbarMsg: "Error"
  };

  componentDidMount() {
    this.props.requestType === "put" &&
      fetch(`http://localhost:6543/api/restaurant/${this.props.id}`)
        .then(response => response.json())
        .then(rest => rest.data[0])
        .then(restInfo =>
          this.setState({
            name: restInfo.name,
            address: restInfo.address_id,
            phone: restInfo.phone,
            description: restInfo.description,
            tags: [...restInfo.tags]
          })
        );

    fetch("http://localhost:6543/api/tag")
      .then(response => response.json())
      .then(tags => this.setState({ allTags: tags.data }));
  }

  handleExpandFormClick = () => {
    this.setState({
      formExpanded: !this.state.formExpanded
    });
  };

  handleCloseFormClick = () => {
    this.setState({
      formExpanded: false
    });
  };

  handleSubmit = (event, requestType, restId) => {
    event.preventDefault();
    const { name, address, description, phone, tags } = this.state;

    const newRest = { name, address, description, phone, tags };

    if (requestType === "post" && (!name.trim() || !address.trim())) {
      this.setState({
        isValid: false,
        snackbarOpen: true,
        snackbarMsg: "Fill all required fields",
        success: false
      });
      return;
    }

    switch (requestType) {
      // eslint-disable-next-line
      case "post":
        return fetch("http://localhost:6543/api/user_restaurants", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify(newRest)
        })
          .then(response => {
            return response.status >= 200 && response.status < 300
              ? response.json()
              : response.json().then(Promise.reject.bind(Promise));
          })
          .then(myRest => {
            this.setState({
              snackbarOpen: true,
              success: myRest.success,
              snackbarMsg: myRest.message
            });
            this.props.onAdd(myRest.data);
          })
          .catch(err => {
            this.setState({
              snackbarOpen: true,
              success: err.success,
              snackbarMsg: err.error
            });
          });

      case "put":
        return fetch(`http://localhost:6543/api/user_restaurant/${restId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify(newRest)
        })
          .then(response => {
            return response.status >= 200 && response.status < 300
              ? response.json()
              : response.json().then(Promise.reject.bind(Promise));
          })
          .then(myRest => {
            this.setState({
              snackbarOpen: true,
              success: myRest.success,
              snackbarMsg: myRest.message
            });
            this.props.onUpdate(myRest.data);
          })
          .catch(err => {
            this.setState({
              snackbarOpen: true,
              success: err.success,
              snackbarMsg: err.error
            });
          });
    }
  };

  handleFormChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      isValid: true
    });
  };

  handleTagsChange = event => {
    this.setState({ tags: event.target.value });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  render() {
    const { classes, requestType, id } = this.props;
    const {
      formExpanded,
      allTags,
      tags,
      isValid,
      snackbarOpen,
      name,
      address,
      description,
      phone,
      success,
      snackbarMsg
    } = this.state;

    return (
      <CardContent>
        <div className={classes.header}>
          <Typography variant="h6">
            {requestType === "post" ? "Add new" : "Update"} restaurant:
          </Typography>
          <Fab
            className={classnames(classes.fab, {
              [classes.fabDisabled]: formExpanded
            })}
            onClick={this.handleExpandFormClick}
            aria-expanded={formExpanded}
            aria-label="Show more"
            color="primary"
            disabled={formExpanded}
          >
            {requestType === "post" ? <AddIcon /> : <Edit />}
          </Fab>
        </div>
        <Collapse in={formExpanded} timeout="auto" unmountOnExit>
          <Card>
            <CardContent>
              <form
                onSubmit={event => this.handleSubmit(event, requestType, id)}
                className={classes.form}
                noValidate
                autoComplete="off"
                onChange={this.handleFormChange}
              >
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <TextField
                      value={name}
                      required={requestType === "post"}
                      name="name"
                      label="Restaurant Name"
                      fullWidth
                      className={classes.textField}
                      error={!isValid}
                      helperText={!isValid && "Required field"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={address}
                      required={requestType === "post"}
                      name="address"
                      label="Restaurant Address"
                      fullWidth
                      className={classes.textField}
                      error={!isValid}
                      helperText={!isValid && "Required field"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={phone}
                      name="phone"
                      label="Restaurant Phone"
                      fullWidth
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={description}
                      name="description"
                      label="Restaurant Description"
                      multiline
                      rows="4"
                      fullWidth
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid container item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="select-multiple-checkbox">
                        Tags
                      </InputLabel>
                      <Select
                        multiple
                        value={tags}
                        onChange={this.handleTagsChange}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => {
                          let selectedStr = selected
                            .map(selectedItem => selectedItem.name)
                            .join(", ");

                          return selectedStr;
                        }}
                        MenuProps={MenuProps}
                      >
                        {allTags.map(tag => (
                          <MenuItem key={tag.id} value={tag}>
                            <Checkbox checked={tags.indexOf(tag) > -1} />
                            <ListItemText primary={tag.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    className={classes.btns}
                    container
                    item
                    xs={12}
                    justify="space-between"
                  >
                    <Grid item xs={3}>
                      <Button
                        onClick={this.handleCloseFormClick}
                        variant="contained"
                        color="secondary"
                        fullWidth
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        {requestType === "post" ? "Add" : "Update"}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Collapse>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            "aria-describedby": "message-id",
            className: success ? classes.snackbarSuccess : classes.snackbarError
          }}
          message={<span id="message-id">{snackbarMsg}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </CardContent>
    );
  }
}

export default withStyles(styles)(AddUpdateRestaurant);
