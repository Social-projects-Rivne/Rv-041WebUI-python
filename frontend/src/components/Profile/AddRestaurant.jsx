import React from "react";
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
} from "@material-ui/core";
import classnames from "classnames";

const styles = theme => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.unit * 2,
  },
  fab: {
    transform: "scale(1)",
    transition: theme.transitions.create("transform"),
  },
  fabDisabled: {
    transform: "scale(0)",
  },
});

class AddRestaurant extends React.Component {
  state = {
    expanded: false,
    name: "",
    address: "",
    phone: "",
    description: "",
  };

  handleExpandFormClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  handleCloseFormClick = () => {
    this.setState({
      expanded: false,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, address, phone, description } = this.state;

    // fetch("http://localhost:6543/add_restaurant", {method: "POST"})
    //   .then(response => response.json())
    //   .then(data => this.setState({ tags: data.data }));

    console.log(name, address, phone, description);
  };

  handleFormChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <CardContent>
        <div className={classes.header}>
          <Typography variant="title">Add new restaurant:</Typography>
          <Fab
            className={classnames(classes.fab, {
              [classes.fabDisabled]: expanded,
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
                onSubmit={event => this.handleSubmit(event)}
                className={classes.form}
                noValidate
                autoComplete="off"
                onChange={this.handleFormChange}
              >
                <Grid justify="space-between" container spacing={16}>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Restaurant Name"
                      fullWidth
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="address"
                      label="Restaurant Address"
                      fullWidth
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="phone"
                      label="Restaurant Phone"
                      fullWidth
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="description"
                      label="Restaurant Description"
                      multiline
                      rows="4"
                      fullWidth
                      className={classes.textField}
                    />
                  </Grid>
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
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Collapse>
      </CardContent>
    );
  }
}

export default withStyles(styles)(AddRestaurant);
