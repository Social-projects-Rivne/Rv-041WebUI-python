import React from "react";
import { withStyles, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: { flexGrow: 1 },
  navItem: {}
});

const Menu = [
  { name: "Home", route: "/" },
  { name: "Restaurants List", route: "/restaurants-list" },
  { name: "Restaurants Map", route: "/restaurants-map" }
];

class NavMenu extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <nav className={classes.root}>
        {Menu.map(item => (
          <Button
            key={item.name}
            color="inherit"
            disableRipple
            component={Link}
            to={item.route}
            className={classes.navItem}
          >
            {item.name}
          </Button>
        ))}
      </nav>
    );
  }
}

export default withStyles(styles)(NavMenu);
