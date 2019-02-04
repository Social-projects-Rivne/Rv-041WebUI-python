import React from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import PropTypes, { string } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import {
  Restaurant,
  AccountCircle,
  Work,
  Feedback,
  Report,
  Archive,
  ExpandLess,
  ExpandMore
} from "@material-ui/icons";

import ArchivePage from "./ArchiveDataPage";
import Messages from "./MessagesFeedbacksPage";
import GeneralError from "../components/ErrorPages/GeneralError";
import RestaurantsForApprovalPage from "./RestaurantsForApprovalPage";
import Users from "./UsersPage";
import ClassNames from "classnames";
import GenericTabs from "../Service/GenericTabs";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

class ModeratorPanel extends React.Component {
  state = {
    isLoading: true,
    accessAllowed: false,
    error: "",
    token: localStorage.getItem("token"),
    /*renderingComponent: <RestaurantsForApprovalPage />,*/
    selectedItemName: "Restaurants",
    selectedStatus: {
      "Restaurants": "All",
      "Users": "All",
      "Messages": "All",
    }
  };

  tags = {
    Restaurants: ["All", "Unapproved", "Approved", "Archived"],
    Users: ["All", "Owners", "Users"],
    Messages: ["All", "Feedbacks", "Reports"]
  };

  tagsValues = {"All": [0, 1, 2],
    "Unapproved": [0],
    "Approved": [1],
    "Archived": [2],
  }

  routes = () =>{
    return( 
      [
        {
          path: "/moderator/",
          render: (props) => {
            return (
              <RestaurantsForApprovalPage
                restaurantStatus={this.tagsValues[this.state.selectedStatus]}
              />
            );
          },
          exact: true
        },
        {
          path: "/moderator/restaurants",
          render: (props) => {
            return (
              <RestaurantsForApprovalPage
                restaurantStatus={this.tagsValues[this.state.selectedStatus]}
              />
            );
          },
          exact: true
        },
        {
          path: "/moderator/users",
          render: (props) => {
            return (
              <Users/>
            );
          },
          exact: true
        },
        {
          path: "/moderator/messages",
          render: (props) => {
            return (
              <Messages/>
            );
          },
          exact: true
        }
      ]
    );
  }; 
  
  icons = {
    Restaurants: <Restaurant />,
    Users: <AccountCircle />,
    Messages: <Report />
  };

  classes = this.props.classes;

  componentDidMount() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": this.state.token
    });

    const fetchInit = {
      method: "GET",
      headers: headers,
    };

    fetch("http://localhost:6543/api/moderator", fetchInit)
      .then(response =>
        !(response.status >= 200 && response.status < 300)
          ? Promise.reject(response.status)
          : response.json()
      )
      .then(data =>
        this.setState({ isLoading: false, accessAllowed: data.success })
      )
      .catch(err =>
        this.setState({
          isLoading: false,
          accessAllowed: false,
          error: "" + err
        })
      );
  }

  handleTabChange = (event, value) => {
    this.setState({ selectedStatus: this.tags[this.state.selectedItemName][value]});
  };

  render() {

    const { isLoading, accessAllowed, error, selectedItemName, selectedStatus } = this.state;
    const { classes } = this.props;

    if (isLoading) {
      return null;
    }

    if (!accessAllowed) {
      return <GeneralError error={error} />;
    }

    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <List>
            {["Restaurants", "Users", "Messages"].map(
              (text, index) => (
                <ListItem
                  button
                  selected={this.state.selectedItemName === text}
                  key={text}
                  onClick={() => {this.setState({selectedItemName: text})}}
                  component={Link} to={ "/moderator/" + text.toLowerCase() }
                >
                  <ListItemIcon>{this.icons[text]}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div>
            <GenericTabs
              tags={this.tags[selectedItemName]}
              selectedValue={this.tags[selectedItemName].indexOf(selectedStatus)}
              handleTabChange={this.handleTabChange}
            />
          </div>
          {/*this.components()[this.state.selectedItemName]*/}
          <Switch>
            {this.routes().map(({ path, render, exact }, index) => (
              <Route
                exact={exact}
                key={index}
                path={path}
                render={render}
              />
              ))
            }
          </Switch>
        </main>
      </div>
    );
  }
}

ModeratorPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ModeratorPanel);
