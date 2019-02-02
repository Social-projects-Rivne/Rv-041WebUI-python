import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
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

const routes = [
  {
    path: "/moderator/",
    component: RestaurantsForApprovalPage,
    exact: true
  },
  {
    path: "/moderator/restaurants",
    component: RestaurantsForApprovalPage,
    exact: true
  },
  {
    path: "/moderator/users",
    component: Users,
    exact: true
  },
  {
    path: "/moderator/messages",
    component: Messages,
    exact: true
  }
];


class ModeratorPanel extends React.Component {
  state = {
    isLoading: true,
    accessAllowed: false,
    error: "",
    token: localStorage.getItem("token"),
    /*renderingComponent: <RestaurantsForApprovalPage />,*/
    selectedItemName: "Restaurants",
    selectedStatus: "All",
  };

  tags = ["All", "Unapproved", "Approved", "Archived"];

  tagsValues = {"All": [0, 1, 2],
    "Unapproved": [0],
    "Approved": [1],
    "Archived": [2],
  }

  components = () => {
    return(
      {Restaurants: <RestaurantsForApprovalPage restaurantStatus={this.tagsValues[this.state.selectedStatus]}/>,
      Users: <Users userStatus="Users" />,
      Owners: <Users userStatus="Owners" />,
      Feedbacks: <Messages messageStatus="Feedbacks" />,
      Reports: <Messages messageStatus="Reports" />,
      Archive: <ArchivePage archiveStatus="Archive" />}
    );
  };

  icons = {
    Restaurants: <Restaurant />,
    Users: <AccountCircle />,
    Owners: <Work />,
    Feedbacks: <Feedback />,
    Reports: <Report />,
    Archive: <Archive />
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
    this.setState({ selectedStatus: this.tags[value]});
  };

  render() {

    const { isLoading, accessAllowed, error, selectedStatus } = this.state;
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
            {["Restaurants", "Users", "Owners", "Feedbacks", "Reports"].map(
              (text, index) => (
                <ListItem
                  button
                  selected={this.state.selectedItemName === text}
                  key={text}
                  onClick={() => {
                    this.setState({
                      /*renderingComponent: this.components()[text],*/
                      selectedItemName: text
                    });
                  }}
                >
                  <ListItemIcon>{this.icons[text]}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
          <Divider />
          <List>
            {["Archive"].map((text, index) => (
              <ListItem
                button
                selected={this.state.selectedItemName === text}
                key={text}
                onClick={() => {
                  this.setState({
                    /*renderingComponent: this.components()[text],*/
                    selectedItemName: text
                  });
                }}
              >
                <ListItemIcon>{this.icons[text]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div>
            <GenericTabs
              tags={this.tags}
              selectedValue={this.tags.indexOf(selectedStatus)}
              handleTabChange={this.handleTabChange}
            />
          </div>
          {/*this.components()[this.state.selectedItemName]*/}
          <Switch>
            {routes.map(({ path, component, exact }) => (
              <Route
                exact={exact}
                key={component}
                path={path}
                component={component}
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
