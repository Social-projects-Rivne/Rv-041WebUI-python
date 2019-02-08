import React from "react";
import PropTypes from "prop-types";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Archive from "@material-ui/icons/Archive";
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
          <MenuItem onClick={this.handleClose}>
            <ListItemIcon>
              <Archive />
            </ListItemIcon>
            <ListItemText inset primary="Archive" />
          </MenuItem>
          <Divider />
          <MenuItem
            component={Link}
            to={`/profile/restaurants/${restData.id}/edit`}
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
