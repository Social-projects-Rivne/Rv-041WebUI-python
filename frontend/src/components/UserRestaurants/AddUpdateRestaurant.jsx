import React from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  Fab,
  withStyles,
  Typography,
  Collapse,
  Card,
  CardContent,
  Grid,
  Button,
  Tooltip,
  CardHeader,
  Divider
} from "@material-ui/core";
import classnames from "classnames";
import AddRestaurantForm from "./AddRestaurantForm";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    padding: `${theme.spacing.unit * 2}px 0`
  },
  fab: {
    transform: "scale(1)",
    transition: theme.transitions.create("transform")
  },
  fabDisabled: {
    transform: "scale(0)"
  }
});

class AddUpdateRestaurant extends React.Component {
  state = {
    formExpanded: false
  };

  handleExpandFormClick = () => {
    this.setState({
      formExpanded: true
    });
  };

  handleCloseFormClick = () => {
    this.setState({
      formExpanded: false
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    console.log(e, "submitted");
  };

  render() {
    const { classes } = this.props;
    const { formExpanded } = this.state;

    return (
      <>
        <div className={classes.root}>
          <Tooltip title="Add Restaurant" placement="left">
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
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
        <Collapse in={formExpanded} timeout="auto" unmountOnExit>
          <Card>
            <CardHeader
              title={<Typography variant="h6">Add new restaurant:</Typography>}
            />
            <Divider />
            <CardContent>
              <AddRestaurantForm />
            </CardContent>
          </Card>
        </Collapse>
      </>
    );
  }
}

export default withStyles(styles)(AddUpdateRestaurant);
