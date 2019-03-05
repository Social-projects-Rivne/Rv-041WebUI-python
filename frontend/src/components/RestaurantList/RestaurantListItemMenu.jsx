import React from "react";
import PropTypes from "prop-types";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Unarchive, Archive } from "@material-ui/icons";
import Setting from "@material-ui/icons/Settings";
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemText,
  ListItemIcon,
  Divider
} from "@material-ui/core";
import { Link } from "react-router-dom";

class RestaurantListItemMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleRestaurantDelete = e => {
    const rest = this.props.restData;
    if ([1, 0].includes(rest.status)) {
      this.sendRestaurantToggle(2);
      this.handleClose();
    } else {
      this.sendRestaurantToggle(0);
      this.handleClose();
    }
  };

  sendRestaurantToggle = status => {
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem("token")
    });

    const fetchInit = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        id: this.props.restData.id,
        status: status
      })
    };

    fetch("http://localhost:6543/api/delete_restaurant", fetchInit)
      .then(response =>
        !(response.status >= 200 && response.status < 300)
          ? Promise.reject(response.status)
          : response.json()
      )
      .then(
        this.props.ctx.handleArchiveRestaurant(this.props.restData.id, status)
      );
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { restData } = this.props;

    return (
      <>
        <IconButton
          aria-label="More"
          aria-owns={open ? "item-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="item-menu"
          getContentAnchorEl={null}
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          disableAutoFocusItem
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <MenuItem onClick={this.handleRestaurantDelete}>
            <ListItemIcon>
              {[1, 0].includes(restData.status) && <Archive />}
              {![1, 0].includes(restData.status) && <Unarchive />}
            </ListItemIcon>
            <ListItemText
              inset
              primary={
                [1, 0].includes(restData.status) ? "Archive" : "Unarchive"
              }
            />
          </MenuItem>

          <Divider />
          <MenuItem
            component={Link}
            to={`/profile/restaurants/${restData.id}/edit/info`}
            onClick={this.handleClose}
          >
            <ListItemIcon>
              <Setting />
            </ListItemIcon>
            <ListItemText inset primary="Manage" />
          </MenuItem>
        </Menu>
      </>
    );
  }
}

RestaurantListItemMenu.propTypes = {
  restData: PropTypes.object.isRequired
};

export default RestaurantListItemMenu;
