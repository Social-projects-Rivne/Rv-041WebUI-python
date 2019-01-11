import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
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
    expanded: false,
    name: "",
    address: "",
    phone: "",
    description: "",
    tag: [],
    tags: [],
    snackbarOpen: false,
    notValid: false
  };

  componentDidMount() {
    fetch("http://localhost:6543/tag")
      .then(response => response.json())
      .then(tags => this.setState({ tags: tags.data }));
  }

  handleExpandFormClick = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  handleCloseFormClick = () => {
    this.setState({
      expanded: false
    });
  };

  handleSubmit = (event, requestType, restId) => {
    event.preventDefault();
    const { name, address, phone, description, tag } = this.state;

    if (!name.trim() || (!address.trim() && requestType === "post")) {
      this.setState({ notValid: true });
      return;
    } else {
      this.setState({ notValid: false });
    }

    switch (requestType) {
      case "post":
        return fetch("http://localhost:6543/add_restaurant/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            address: address,
            phone: phone,
            description: description,
            tag: tag
          })
        })
          .then(response => response.json())
          .then(myRest => {
            return this.props.onAdd(myRest.data);
          })
          .then(this.setState({ snackbarOpen: true }))
          .then(
            this.setState({
              name: "",
              address: "",
              phone: "",
              description: "",
              tag: []
            })
          )
          .catch(err => console.log(err));

      case "put":
        return fetch(`http://localhost:6543/update_restaurant/${restId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            address: address,
            phone: phone,
            description: description,
            tag: tag
          })
        })
          .then(response => response.json())
          .then(myRest => {
            return this.props.onUpdate(myRest.data);
          })
          .then(this.setState({ snackbarOpen: true }))
          .catch(err => console.log(err));
    }
  };

  handleFormChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleTagChange = event => {
    this.setState({ tag: event.target.value });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  render() {
    const { classes } = this.props;
    const {
      expanded,
      tag,
      tags,
      name,
      phone,
      address,
      description,
      notValid
    } = this.state;
    return (
      <CardContent>
        <div className={classes.header}>
          <Typography variant="title">
            {this.props.requestType === "post" ? "Add" : "Update"} new
            restaurant:
          </Typography>
          <Fab
            className={classnames(classes.fab, {
              [classes.fabDisabled]: expanded
            })}
            onClick={this.handleExpandFormClick}
            aria-expanded={expanded}
            aria-label="Show more"
            color="primary"
            disabled={expanded}
          >
            <AddIcon />
          </Fab>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Card>
            <CardContent>
              <form
                onSubmit={event =>
                  this.handleSubmit(
                    event,
                    this.props.requestType,
                    this.props.id
                  )
                }
                className={classes.form}
                noValidate
                autoComplete="off"
                onChange={this.handleFormChange}
              >
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <TextField
                      value={name}
                      required
                      name="name"
                      label="Restaurant Name"
                      fullWidth
                      className={classes.textField}
                      error={notValid}
                      helperText={notValid && "Required field"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={address}
                      required
                      name="address"
                      label="Restaurant Address"
                      fullWidth
                      className={classes.textField}
                      error={notValid}
                      helperText={notValid && "Required field"}
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
                        label="Restaurant Description"
                        value={tag}
                        onChange={this.handleTagChange}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {tags.map(item => (
                          <MenuItem key={item.name} value={item.name}>
                            <Checkbox checked={tag.indexOf(item.name) > -1} />
                            <ListItemText
                              className={classes.listItem}
                              primary={item.name}
                            />
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
                        {this.props.requestType === "post" ? "Add" : "Update"}
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
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              Restaurant was{" "}
              {this.props.requestType === "post" ? "added" : "update"}
            </span>
          }
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
