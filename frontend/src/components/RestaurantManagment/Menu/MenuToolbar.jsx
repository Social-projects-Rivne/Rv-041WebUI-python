import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import {
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  withStyles,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { StarBorder, Star, MoreVert } from "@material-ui/icons";

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center"
  },
  title: {
    flex: "0 0 auto"
  }
});

class MenuToolbar extends React.Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handlePrimaryToggle = () => {
    this.sendPrimaryToggle(this.props.menuId, this.props.ctx.restId);
    this.handleClose();
  }

  sendPrimaryToggle = (menuId, restId) => {
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem("token")
    });
    const fetchInit = {
      method: "PUT",
      headers: headers
    };
    const url = `http://localhost:6543/api/restaurant/${restId}/menu/${menuId}`
    fetch(url, fetchInit)
      .then(response => response.json())
      .then(data => {
        this.props.ctx.handlePrimaryToggle(menuId);
      })
      .catch(console.log);
  }


  render() {
    const { numSelected, classes, menuName, menuId } = this.props;
    const menu = this.props.ctx.menusList.find(item => (item.id == menuId)) || [];
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle">
              {menuName}
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 && (
            <>
              <Tooltip title="Delete">
                <IconButton aria-label="Delete">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Filter list">
                <IconButton size="small" aria-label="Filter list">
                  <FilterListIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
          <IconButton
            aria-label="Action"
            onClick={this.handleClick}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="item-menu"
            getContentAnchorEl={null}
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
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
            <MenuItem onClick={this.handlePrimaryToggle}>
              <ListItemIcon>
                {menu.primary ? <StarBorder /> : <Star />}
              </ListItemIcon>
              <ListItemText
                inset
                primary={
                  menu.primary ? "Make not primary" : "Make primary"
                }
              />
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    );
  }
}

MenuToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number,
  menuName: PropTypes.string.isRequired
};

export default withStyles(toolbarStyles)(MenuToolbar);
