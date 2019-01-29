import React from "react";
import PropTypes from "prop-types";
import { withStyles, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const styles = theme => ({
  root: { display: "flex", marginLeft: "auto", alignSelf: "stretch" },
  navItem: {
    "&.active": {
      "& $navItemActive": {
        transform: "scale(1)"
      }
    }
  },
  navItemActive: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: theme.spacing.unit / 2,
    backgroundColor: theme.palette.secondary.light,
    transform: "scale(0)",
    transformOrigin: "bottom",
    transition: theme.transitions.create("transform")
  }
});

const Menu = [
  { name: "Home", route: "/" },
  { name: "Restaurants List", route: "/restaurants" },
  { name: "Restaurants Map", route: "/restaurants-map" }
];

class NavMenu extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <nav className={classes.root}>
        {Menu.map(item => (
          <Button
            exact
            key={item.name}
            color="inherit"
            disableRipple
            component={NavLink}
            to={item.route}
            className={classes.navItem}
          >
            {item.name}
            <span className={classes.navItemActive} />
          </Button>
        ))}
      </nav>
    );
  }
}

NavMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavMenu);
