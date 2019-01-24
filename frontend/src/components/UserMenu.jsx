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
  root: {
    marginLeft: theme.spacing.unit * 6
  }
});

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    fetch("http://localhost:6543/api/login", {
      method: "DELETE",
      headers: {
        "x-auth-token": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          throw data;
        }
      })
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        this.props.ctx.changeState({
          auth: false,
          token: "",
          role: ""
        });
        this.setState({ anchorEl: null });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { auth, role } = this.props.ctx;
    const isOwner = role === "Owner";
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes, isLogIn, isSignUp } = this.props;
    const match = "";

    return (
      <div className={classes.root}>
        {!auth && (
          <div className={classes.userMenu}>
            {!isLogIn && (
              <Button color="inherit" component={Link} to={`${match}/log-in`}>
                Sign In
              </Button>
            )}
            {!isLogIn && !isSignUp && "/"}
            {!isSignUp && (
              <Button color="inherit" component={Link} to={`${match}/sign-up`}>
                Sign Up
              </Button>
            )}
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
              style={{ marginTop: 60 }}
            >
              <MenuItem
                onClick={this.handleClose}
                component={Link}
                to={`${match}/profile`}
              >
                My Profile
              </MenuItem>
              <MenuItem onClick={this.handleClose}>Current orders</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
              {isOwner && (
                <div>
                  <MenuItem
                    component={Link}
                    to="/profile/my-restaurants"
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
