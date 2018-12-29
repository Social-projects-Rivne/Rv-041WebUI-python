import React from "react";
import { withStyles, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = {
  root: {}
};

class NavMenu extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <nav className={classes.root}>
        <Button component={Link} to="/">
          Home
        </Button>
        <Button component={Link} to="/restaurants-list">
          Restaurants list
        </Button>
        <Button component={Link} to="/restaurants-map">
          Restaurants map
        </Button>
      </nav>
    );
  }
}

export default withStyles(styles)(NavMenu);
