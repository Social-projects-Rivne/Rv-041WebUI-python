import React from "react";
import {
  withStyles,
  Divider,
  Menu,
  IconButton,
  MenuItem,
  Button,
  Avatar
} from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {}
});

class UserMenu extends React.Component {
  state = {
    auth: true,
    isOwner: true,
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.setState({
      auth: false,
      anchorEl: null
    });
  };

  render() {
    const { auth, anchorEl, isOwner } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
    const match = "";
    return (
      <div className={classes.root}>
        {!auth && (
          <div className={classes.userMenu}>
            <Button color="inherit" component={Link} to={`${match}/log-in`}>
              Log In
            </Button>
            /{" "}
            <Button color="inherit" component={Link} to={`${match}/sign-up`}>
              Sign Un
            </Button>
          </div>
        )}
        {auth && (
          <div className={classes.userMenu}>
            <IconButton
              color="inherit"
              aria-owns={open ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
            >
              <Avatar>V</Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem
                component={Link}
                to="/profile"
                onClick={this.handleClose}
              >
                Personal info
              </MenuItem>
              {isOwner && (
                <div>
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={this.handleClose}
                  >
                    My restaurant
                  </MenuItem>
                </div>
              )}
              <Divider />
              <MenuItem onClick={this.handleLogout}>Log Out</MenuItem>
            </Menu>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(UserMenu);
