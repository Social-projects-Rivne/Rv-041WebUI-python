import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {restaurant} from '@material-ui/icons';

import RestaurantsForApprovalPage from "./RestaurantsForApprovalPage";
import Users from "./UsersPage";
import Messages from "./MessagesFeedbacksPage";
import Archive from "./ArchiveDataPage";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});


class PermanentDrawerLeft extends React.Component {

  state = {
    renderingComponent: <RestaurantsForApprovalPage />,
  };

  components = {
    Restaurants: <RestaurantsForApprovalPage />,
    Users: <Users userStatus="Users"/>,
    Owners: <Users userStatus="Owners"/>,
    Feedbacks: <Messages messageStatus="Feedbacks"/>,
    Reports: <Messages messageStatus="Reports"/>,
    Archive: <Archive archiveStatus="Archive"/>,
  };

  icons = {
    Restaurants: <restaurant/>,
  };

  classes = this.props.classes;

  render() {

    return (
      <div className={this.classes.root}>
        <CssBaseline />
        <Drawer
          className={this.classes.drawer}
          variant="permanent"
          classes={{
            paper: this.classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={this.classes.toolbar} />
          <Divider />
          <List>
            {['Restaurants', 'Users', 'Owners', 'Feedbacks', 'Reports'].map((text, index) => (
              <ListItem button key={text} onClick={() => {
                this.setState({renderingComponent: this.components[text]})
                }}>
                <ListItemIcon>{this.icons[text]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Archive'].map((text, index) => (
              <ListItem button key={text} onClick={() => {
                this.setState({renderingComponent: this.components[text]})
                }}>
                <ListItemIcon>{this.icons[text]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={this.classes.content}>
          {this.state.renderingComponent}
        </main>
      </div>
    );
  }
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawerLeft);