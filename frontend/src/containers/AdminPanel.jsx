import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Link } from "react-router-dom";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles";
import {Restaurant, AccountCircle, Work, SupervisedUserCircle} from "@material-ui/icons"
import UsersPage from "../components/AdminPanelComponents/UsersPage";
import UserCreate from "../components/AdminPanelComponents/UserCreate";
import RestaurantsPage from "../components/AdminPanelComponents/RestaurantsPage";
import GeneralError from "../components/ErrorPages/GeneralError";
import GenericTabs from "../Service/GenericTabs";


const styles = theme => ({
  root: {
    display: "flex",
    marginTop: "64px"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

function getSelectedItemName(pathname) {
  const findedIndex = pathname.lastIndexOf("admin");

  if (findedIndex === -1) {
    return "Users";
  }

  let firstCharIndex = 0;

  if (pathname.charAt(findedIndex + 9) === "/") {
    firstCharIndex = findedIndex + 10;
  } else {
    return "Users";
  }

  const firstChar = pathname.charAt(firstCharIndex).toUpperCase();
  const restWord = pathname.substring(firstCharIndex + 1).toLowerCase();

  const fullWord = firstChar + restWord;
  return fullWord ? fullWord : "Users";
}

class AdminPanel extends React.Component {
  state = {
    error: "",
    showTabs: true,
    selectedItemName: getSelectedItemName(this.props.location.pathname),
    selectedStatus: {
      Restaurants: "All",
      Users: "All",
      Owners: "All",
      Moderators: "All"
    },
    currentStatusAdditionalValues: {}
  };

  tags = {
    Restaurants: ["All", "Unapproved", "Approved", "Archived"],
    Users: ["All", "Active", "Banned"],
    Owners: ["All", "Active", "Banned"],
    Moderators: ["All", "Active", "Banned"]
  };

  tagsValues = {
    Restaurants: {
      All: [0, 1, 2],
      Unapproved: [0],
      Approved: [1],
      Archived: [2]
    },
    Users: { All: [false, true], Active: [true], Banned: [false] },
    Owners: { All: [false, true], Active: [true], Banned: [false] },
    Moderators: { All: [false, true], Active: [true], Banned: [false] }
  };

  roles = {
    client: 1,
    owner: 2,
    moderator: 3,
    admin: 4,
    administrator: 5,
    waiter: 6
  };

  icons = {
    Restaurants: <Restaurant />,
    Users: <AccountCircle />,
    Owners: <Work />,
    Moderators: <SupervisedUserCircle />
  };

  classes = this.props.classes;

  routes = () => {
    return [
      {
        path: "/admin",
        render: () => {
          return (
            <UsersPage
              userActivity={
                this.tagsValues.Users[this.state.selectedStatus.Users]
              }
              userStatus={this.roles.client}
              tagsValues={this.tagsValues.Users}
              setAdditionalTabData={this.setAdditionalTabData}
              tabsDisplay={(value) => this.setState({ showTabs: value })}
              /*
              TODO: Refactor "showTabs" tabsDisplay={(value) => this.setState({ showTabs: value })}
               here and in the code below.
              */
            />
          );
        },
        exact: true
      },
      {
        path: "/admin/users",
        render: () => {
          return (
            <UsersPage
              userActivity={
                this.tagsValues.Users[this.state.selectedStatus.Users]
              }
              userStatus={this.roles.client}
              tagsValues={this.tagsValues.Users}
              setAdditionalTabData={this.setAdditionalTabData}
              tabsDisplay={(value) => this.setState({ showTabs: value })}
            />
          );
        },
        exact: true
      },
      {
        path: "/admin/owners",
        render: () => {
          return (
            <UsersPage
              userActivity={
                this.tagsValues.Owners[this.state.selectedStatus.Owners]
              }
              userStatus={this.roles.owner}
              tagsValues={this.tagsValues.Owners}
              setAdditionalTabData={this.setAdditionalTabData}
              tabsDisplay={(value) => this.setState({ showTabs: value })}
            />
          );
        },
        exact: true
      },
      {
        path: "/admin/moderators",
        render: () => {
          return (
            <UsersPage
              userActivity={
                this.tagsValues.Moderators[this.state.selectedStatus.Moderators]
              }
              userStatus={this.roles.moderator}
              tagsValues={this.tagsValues.Moderators}
              setAdditionalTabData={this.setAdditionalTabData}
              tabsDisplay={(value) => this.setState({ showTabs: value })}
            />
          );
        },
        exact: true
      },
      {
        path: "/admin/moderators/create",
        render: () => {
          return (
            <UserCreate
              userStatus={this.roles.moderator}
              tabsDisplay={(value) => this.setState({ showTabs: value })}
            />
          );
        },
        exact: true
      },
      {
        path: "/admin/restaurants",
        render: () => {
          return (
            <RestaurantsPage
              restaurantStatus={
                this.tagsValues.Restaurants[
                  this.state.selectedStatus.Restaurants
                ]
              }
              tagsValues={this.tagsValues.Restaurants}
              setAdditionalTabData={this.setAdditionalTabData}
            />
          );
        },
        exact: true
      },
      {
        path: "",
        render: () => {
          return <GeneralError error="404 Not Found" />;
        },
        exact: true
      }
    ];
  };

  componentDidMount() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem("token")
    });

    const fetchInit = {
      method: "GET",
      headers: headers
    };

    fetch('http://localhost:6543/api/users/' + this.roles.client, fetchInit)
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
    this.setState(prevState => {
      const newSelectedStatus = prevState.selectedStatus;
      newSelectedStatus[prevState.selectedItemName] = this.tags[
        prevState.selectedItemName
      ][value];
      return { selectedStatus: newSelectedStatus };
    });
  };

  setAdditionalTabData = additionalTabData => {
    this.setState(() => {
      return { currentStatusAdditionalValues: additionalTabData };
    });
  };

  render() {
    const {
      isLoading,
      selectedItemName,
      selectedStatus,
      currentStatusAdditionalValues
    } = this.state;
    const { classes } = this.props;

    if (isLoading) {
      return null;
    }

    return (
      <div className={classes.root}>
        <div className={classes.toolbar} />
        <List>
          {["Users", "Owners", "Moderators", "Restaurants"].map((text) => (
            <ListItem
              button
              selected={this.state.selectedItemName === text}
              key={text}
              onClick={() => {
                this.setState({ selectedItemName: text });
              }}
              component={Link}
              to={"/admin/" + text.toLowerCase()}
            >
              <ListItemIcon>{this.icons[text]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <main className={classes.content}>
          {this.state.showTabs ?
            <div>
              <GenericTabs
                tags={this.tags[selectedItemName]}
                tagsAdditionalInformation={currentStatusAdditionalValues}
                selectedValue={this.tags[selectedItemName].indexOf(
                  selectedStatus[selectedItemName]
                )}
                handleTabChange={this.handleTabChange}
              />
            </div>
            : null
          }
          <Switch>
            {this.routes().map(({ path, render, exact }, index) => (
              <Route exact={exact} key={index} path={path} render={render}/>
            ))}
          </Switch>
        </main>
      </div>
    );
  }
}

AdminPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminPanel);