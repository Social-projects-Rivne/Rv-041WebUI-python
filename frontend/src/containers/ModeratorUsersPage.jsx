import React, {Component} from "react";
import {Snackbar, Typography, Button} from "@material-ui/core";
import GeneralError from "../components/ErrorPages/GeneralError";
import SnackbarContent from "../components/SnackbarContent";
import Users from "../components/ModeratorPanelComponents/Users";


class ModeratorUsersPage extends Component {

  state = {
    success: null,
    error: "",
    token: localStorage.getItem("token"),
    users: [],
    snackbarOpen: false,
    snackbarMsg: "",
    currentUserId: null,
    previousUserStatus: null,
  };

  componentDidMount() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-Auth-Token': this.state.token,
    });

    const fetchURL = 'http://localhost:6543/api/moderator/' + this.props.userStatus;
    const fetchInit = {
      method: "GET",
      headers: headers,
    };

    fetch(fetchURL, fetchInit)
      .then(response => (!(response.status >= 200 && response.status < 300)
        ? response.json().then(Promise.reject.bind(Promise))
        : response.json()))
      .then(data => this.setState({
        users: data.data,
        success: data.success, error: data.error
      }))
      .then(() => {
        this.pushTabValues(this.state.users);
      })
      .catch(err => {
        this.pushTabValues(this.state.users);
        this.setState({ 
          success: false, 
          error: "" + err.message,
          snackbarOpen: true,
          snackbarMsg: "fail to connect server",
        })
      })
  }

  handleUserBann = (user_id) => {

    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-Auth-Token': this.state.token
    });
    const fetchURL = 'http://localhost:6543/api/moderator/' + this.props.userStatus;
    const fetchInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ id: user_id }),
    };

    fetch(fetchURL, fetchInit)
      .then(response => (!(response.status >= 200 && response.status < 300)
        ? response.json().then(Promise.reject.bind(Promise))
        : response.json()))
      .then(data => this.setState((prevState) => {
        return {
          success: data.success,
          users: prevState.users.map(userInfo => {
            if (userInfo.id === user_id) {
              userInfo.is_active = !userInfo.is_active;
              return userInfo;
            } else {
              return userInfo;
            }
          }),
          currentUserId: user_id,
          snackbarOpen: true,
          snackbarMsg: data.success ? "success" : "failure",
        }
      }))
      .then(() => {
        this.pushTabValues(this.state.users);
      })
      .catch(err => {
        this.pushTabValues(this.state.users);
        this.setState({
          success: false,
          error: "" + err,
          snackbarOpen: true,
          snackbarMsg: "failed to make operation",
          currentUserId: user_id
        })
      })
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  snackbarAction = (
    <Button
      color="secondary"
      size="small"
      onClick={() => {
        this.handleRestaurantApprovement(this.state.currentRestaurantId,
          this.state.previousUserStatus === 2 ? "DELETE" : "POST",
          this.state.previousUserStatus,
          null,
          false);
      }
      }
    >
      Undo
      </Button>
  );

  //push information about quantity to the Tab component
  pushTabValues = (data) => {
    const tagsValues = this.props.tagsValues;
    const tagsNames = Object.keys(tagsValues);
    let additionalValues = {};
    for (let key in tagsNames) {
      let quantity = 0;
      const tagName = tagsNames[key];
      const tagValue = tagsValues[tagName];
      for (let i = 0; i < data.length; i++) { 
        const info = data[i];
        if (tagValue.includes(info.is_active)){
          quantity = quantity + 1;
        }
      }
      additionalValues[tagName] = quantity;
    }
    return this.props.setAdditionalTabData(additionalValues)
  }

  render() {

    const { users, success, error, snackbarOpen, snackbarMsg } = this.state;
    const { userActivity, userStatus } = this.props;

    //prevent for rendering without fetch completing (init value is "null")
    if (success === null) {
      return null;
    }

    return (
      <React.Fragment>
        <Users
          users={users}
          handleUserBann={this.handleUserBann}
          userActivity={userActivity}
          userStatus={userStatus}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={snackbarOpen}
          autoHideDuration={success ? 3000 : 15000}
          onClose={this.handleSnackbarClose}
        >
          <SnackbarContent
            onClose={this.handleSnackbarClose}
            variant={success ? "success" : "error"}
            message={
              <Typography color="inherit" align="center">
                {snackbarMsg || success || "Something went wrong"}
              </Typography>
            }
          />
        </Snackbar>
      </React.Fragment>
    );
  }

}

export default ModeratorUsersPage;
