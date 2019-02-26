import React from "react";
import PropTypes from "prop-types";
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
  },
  avatar: {
    backgroundColor: theme.palette.secondary.light
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
        localStorage.removeItem("userName");
        this.props.ctx.changeState({
          auth: false,
          token: "",
          role: "",
          userName: ""
        });
        this.setState({ anchorEl: null });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { auth, role, userName } = this.props.ctx;
    const isOwner = role === "Owner";
    const isModerator = role === "Moderator";
    const isAdministrator =role === "Administrator";
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes, isLogIn, isSignUp } = this.props;
    const avatarChar = userName.slice(0, 1).toUpperCase();
    return (
      <div className={classes.root}>
        {!auth && (
          <div className={classes.userMenu}>
            {!isLogIn && (
              <Button
                color="inherit"
                replace={isSignUp}
                component={Link}
                to={`/log-in`}
              >
                Sign In
              </Button>
            )}
            {!isLogIn && !isSignUp && "/"}
            {!isSignUp && (
              <Button
                color="inherit"
                replace={isLogIn}
                component={Link}
                to={`/sign-up`}
              >
                Sign Up
              </Button>
            )}
          </div>
        )}
        {auth && (
          <div className={classes.userMenu}>
            <IconButton
              style={{ padding: 0 }}
              color="inherit"
              aria-owns={open ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
            >
              <Avatar className={classes.avatar}>{avatarChar}</Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              getContentAnchorEl={null}
              disableAutoFocusItem
              anchorEl={anchorEl}
              onClick={this.handleClose}
              anchorOrigin={{
                vertical: "bottom",
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
                to={isModerator ? `/moderator` : `/profile/personal_info`}
              >
                {isModerator ? "Moderator panel" : "My Profile"}
              </MenuItem>
              {isOwner && (
                <MenuItem component={Link} to="/profile/restaurants">
                    My restaurants
                </MenuItem>
            )}
                {isAdministrator && (
                    <MenuItem component={Link} to="/administrator-panel">
                        Administrator panel
                    </MenuItem>
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

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  isLogIn: PropTypes.bool.isRequired,
  isSignUp: PropTypes.bool.isRequired
};

export default withStyles(styles)(UserMenu);
