import React from "react";
import GeneralError from "../ErrorPages/GeneralError";
import Users from "./Users";

class UsersPage extends React.Component {
  state = {
    success: null,
    error: "",
    users: [],
    currentUserId: null
  };

  componentDidMount() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem("token")
    });

    const fetchURL = 'http://localhost:6543/api/users/' + this.props.userStatus;
    const fetchInit = {
      method: "GET",
      headers: headers,
    };

    fetch(fetchURL, fetchInit)
      .then(response => (!(response.status >= 200 && response.status < 300)
        ? Promise.reject.bind(Promise)
        : response.json()))
      .then(data => this.setState({
        users: data.data,
        success: data.success, error: data.error
      }))
      .then(() => {
        this.pushTabValues(this.state.users);
      })
      .catch(err => this.setState({ success: false, error: err.message }));

    this.props.tabsDisplay(true)
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  handleUserActivity = (user_id) => {

    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-Auth-Token': localStorage.getItem("token")
    });

    const fetchURL = 'http://localhost:6543/api/user/toggle_activity/' + user_id;
    const fetchInit = {
      method: "GET",
      headers: headers,
    };

    fetch(fetchURL, fetchInit)
      .then(response => (!(response.status >= 200 && response.status < 300)
        ? Promise.reject.bind(Promise)
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
        }
      }))
      .then(() => {
        this.pushTabValues(this.state.users);
      })
      .catch(err => this.setState({
        success: false,
        error: "" + err,
        currentUserId: user_id
      }))
  };

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
  };

  render() {

    const { users, success, error } = this.state;
    const { userActivity, userStatus } = this.props;

    //prevent for rendering without fetch completing (init value is "null")
    if (success === null) {
      return null;
    }

    if (success) {
      return (
        <>
          <Users
            users={users}
            handleUserActivity={this.handleUserActivity}
            userActivity = {userActivity}
            userStatus = {userStatus}
          />
        </>
      );
    } else {
      return (<GeneralError error={error} />);
    }
  }
}

export default UsersPage;
