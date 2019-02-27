import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  withStyles,
  Collapse,
  Zoom
} from "@material-ui/core";
import {
  Assignment,
  People,
  ArtTrack,
  ExpandMore,
  StarBorder,
  AddToPhotos,
  Star
} from "@material-ui/icons";

import { MenuContext } from "../../../containers/RestaurantManegmentPage/RestaurantManagmentPage";

const styles = theme => ({
  navLink: {
    "&.active": {
      background: theme.palette.action.selected
    }
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  menu: {
    transition: theme.transitions.create("transform")
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
    const { classes, match } = this.props;
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
        <MenuContext.Consumer>
          {ctx => (
            <>
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
                <ExpandMore
                  className={classnames(classes.menu, {
                    [classes.menuExpanded]: open
                  })}
                />
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {ctx.menusList.map(listItem => (
                    <Zoom in={true} key={listItem.id}>
                      <ListItem
                        component={NavLink}
                        button
                        to={`${match.url}/menues/${listItem.id}`}
                        className={classes.nested}
                      >
                        <ListItemIcon>
                          {listItem.is_active ? <Star /> : <StarBorder />}
                        </ListItemIcon>
                        <ListItemText inset primary={listItem.name} />
                      </ListItem>
                    </Zoom>
                  ))}
                  <ListItem
                    component={NavLink}
                    button
                    to={`${match.url}/create_menu`}
                    className={classes.nested}
                  >
                    <ListItemIcon>
                      <AddToPhotos />
                    </ListItemIcon>
                    <ListItemText inset primary="Create menu" />
                  </ListItem>
                </List>
              </Collapse>
            </>
          )}
        </MenuContext.Consumer>
        <ListItem
          component={NavLink}
          button
          to={`${match.url}/waiters`}
          className={classes.navLink}
          disableRipple
        >
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
