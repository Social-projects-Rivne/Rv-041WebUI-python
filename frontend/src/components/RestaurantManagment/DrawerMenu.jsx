import React from "react";
import { NavLink } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  withStyles
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";

const styles = theme => ({
  navLink: {
    "&.active": {
      background: theme.palette.action.selected
    }
  }
});

const DrawerMenu = props => {
  const { classes } = props;
  return (
    <List>
      <ListItem
        className={classes.navLink}
        button
        component={NavLink}
        to={`${props.match.url}/info`}
      >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Details" />
      </ListItem>
      <ListItem
        className={classes.navLink}
        button
        component={NavLink}
        to={`${props.match.url}/menues`}
      >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Menues" />
      </ListItem>
      <ListItem className={classes.navLink} button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Waiters" />
      </ListItem>
    </List>
  );
};

export default withStyles(styles)(DrawerMenu);
