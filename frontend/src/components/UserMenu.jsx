import React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  withStyles,
  Divider,
  Menu,
  IconButton,
  MenuItem,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from 'axios';

const styles = theme => ({
  root: {}
});

class UserMenu extends React.Component {

    constructor(props) {
      super(props);
     this.state = {anchorEl: null};
    }


  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    axios.delete('http://localhost:6543/login', {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    }).then(res => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      })
      .then(
        this.props.state.changeState({
          auth: false,
          token: '',
          role: ''
        })
      )
      .then(
        this.setState({anchorEl: null})
      )
  };

  render() {

    const { auth, token, role } = this.props.state.state;
    const isOwner = role === "Owner";
    const { anchorEl } = this.state;
    console.log("asda", anchorEl)
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
              aria-owns={open ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
            >
              <AccountCircle />
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
              style={{marginTop: 60}}
            >
              <MenuItem onClick={this.handleClose}>Personal info</MenuItem>
              <MenuItem onClick={this.handleClose}>Current orders</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
              {isOwner && (
                <div>
                  <MenuItem onClick={this.handleClose}>My restaurant</MenuItem>
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
