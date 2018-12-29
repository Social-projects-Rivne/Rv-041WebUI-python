import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import NavMenu from "./NavMenu";
import UserMenu from "./UserMenu";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  root: {
    marginBottom: theme.spacing.unit * 8
  }
});

class AppHeader extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.grow}>
            Easy-restaurant
          </Typography>
          <NavMenu />
          <UserMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppHeader);
