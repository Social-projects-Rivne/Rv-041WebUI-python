import React, {Component} from "react";
import {Snackbar, Typography, Button} from "@material-ui/core";
import GeneralError from "../components/ErrorPages/GeneralError";
import SnackbarContent from "../components/SnackbarContent";
import Users from "../components/ModeratorPanelComponents/Users";
import {redirectToSignUp} from "../Service/NeedAuthorization";


class ModeratorUsersPage extends Component {

    state = {
        success: null,
        error: "",
        token: localStorage.getItem("token"),
        users: [],
        snackbarOpen:false,
        snackbarMsg: "",
        currentUserId: null,
        previousUserStatus: null
    };

    componentDidMount() {

        const headers = new Headers({
            'Content-Type': 'application/json',
            'X-Auth-Token': this.state.token,
            /*'User-Status': this.props.user_status*/
        });

        const fetchInit = {
            method: "GET",
            headers: headers,
        };

        fetch('http://localhost:6543/api/moderator/users', fetchInit)
            .then(response => (!(response.status >= 200 && response.status < 300)
                    ?Promise.reject(response.status)
                    :response.json()))
            .then(data => this.setState({users: data.data,
                                         success: data.success, error: data.error}))
            .catch(err => this.setState({success: false, error: err.message}))
    }

    handleUserBann = (user_id,
                      request_method,
                      user_status,
                      prev_user_status, snackbarOpen = true) => {

        const headers = new Headers({
            'Content-Type': 'application/json',
            'X-Auth-Token': this.state.token
        });
        /*console.log(prev_rest_status);*/
        const fetchInit = {
            method: request_method,
            headers: headers,
            body: JSON.stringify({id: user_id, status: user_status}),
        };

        let operationName = "";
        if (request_method === "POST"){
          operationName = "Approved";
        }
        if (request_method === "DELETE"){
          operationName = "Disapproved";
        }

        fetch('http://localhost:6543/api/moderator/users', fetchInit)
            .then(response => (!(response.status >= 200 && response.status < 300)
                                 ?Promise.reject(response.status)
                                  :response.json()))
            .then(data => this.setState((prevState) => {
              return{
                success: data.success,
                users: prevState.users.map(userInfo => {
                  if (userInfo.id === user_id) {
                    userInfo.status = user_status;
                    return userInfo;
                  } else {
                    return userInfo;
                  }
                }),
                snackbarOpen: snackbarOpen,
                snackbarMsg: operationName,
                currentUserId: user_id,
                previousUserStatus: prev_user_status
              }
            }))
            .catch(err => this.setState({success: false,
                                         error: "" + err,
                                         snackbarOpen: true,
                                         snackbarMsg: "" + err,
                                         currentUserId: user_id}))
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
              this.state.previousUserStatus === 2 ? "DELETE" :"POST",
              this.state.previousUserStatus,
              null,
              false);}
          }
        >
        Undo
      </Button>
    );

    render() {

        const {users, success, error, snackbarOpen, snackbarMsg} = this.state;
        const {userStatus} = this.props;

        //prevent for rendering without fetch completing (init value is "null")
        if (success === null){
            return null;
        }

    if (success) {
      return (
        <React.Fragment>
          <Users
            users={users}
            handleRestaurantApprovement={this.handleRestaurantApprovement}
            userStatus={userStatus}
          />
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            open={snackbarOpen}
            autoHideDuration={success ? 3000 : null}
            onClose={this.handleSnackbarClose}
          >
            <SnackbarContent
              onClose={this.handleSnackbarClose}
              action={success ? this.snackbarAction : null}
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
    else {
      return (<GeneralError error={error} />);
    }

  }

}

export default ModeratorUsersPage;
