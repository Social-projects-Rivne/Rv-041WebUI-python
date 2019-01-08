import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import NavMenu from "./NavMenu";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    marginBottom: 24,
  },
  grow: {
    flexGrow: 1,
  },
  logoLink: {
    textDecoration: "none",
    color: "#fff",
  },
});

class AppHeader extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Typography variant="button" className={classes.grow}>
            <Link className={classes.logoLink} to="/">
              Easy-rest
            </Link>
          </Typography>
          <NavMenu />
          <UserMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppHeader);
