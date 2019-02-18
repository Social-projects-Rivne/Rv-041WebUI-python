import React from "react";
import { NavLink } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  withStyles,
  Collapse
} from "@material-ui/core";
import {
  Assignment,
  People,
  ArtTrack,
  ExpandMore,
  StarBorder
} from "@material-ui/icons";

const styles = theme => ({
  navLink: {
    "&.active": {
      background: theme.palette.action.selected
    }
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  menuExpanded: {
    transform: "rotate(180deg)"
  }
});

class DrawerMenu extends React.Component {
  state = {
    open: true
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, match, list } = this.props;
    const { open } = this.state;
    return (
      <List>
        <ListItem
          className={classes.navLink}
          button
          disableRipple
          component={NavLink}
          to={`${match.url}/info`}
        >
          <ListItemIcon>
            <Assignment />
          </ListItemIcon>
          <ListItemText primary="Details" />
        </ListItem>
        <ListItem
          className={classes.navLink}
          button
          disableRipple
          onClick={this.handleClick}
        >
          <ListItemIcon>
            <ArtTrack />
          </ListItemIcon>
          <ListItemText primary="Menues" />
          {list.length > 0 && (
            <ExpandMore className={open ? classes.menuExpanded : ""} />
          )}
        </ListItem>
        {list.length > 0 && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {list.map(listItem => (
                <ListItem
                  component={NavLink}
                  key={listItem.id}
                  button
                  to={`${match.url}/menues/${listItem.id}`}
                  className={classes.nested}
                >
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText inset primary={listItem.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        )}
        <ListItem className={classes.navLink} button disableRipple>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Waiters" />
        </ListItem>
      </List>
    );
  }
}

export default withStyles(styles)(DrawerMenu);
