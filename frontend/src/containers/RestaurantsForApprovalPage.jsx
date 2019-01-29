import React, {Component} from "react";
import {Snackbar, Typography} from "@material-ui/core";
import GeneralError from "../components/ErrorPages/GeneralError";
import SnackbarContent from "../components/SnackbarContent";
import RestaurantsForApproval from "../components/RestaurantsForApproval/RestaurantsForApproval";
import {redirectToSignUp} from "../Service/NeedAuthorization";


class RestaurantsForApprovalPage extends Component {

    state = {
        needRedirection: false,
        success: null,
        error: "",
        token: localStorage.getItem("token"),
        unapprovedRestaurants: [],
        snackbarOpen:false,
        snackbarMsg: "",
    };

    componentDidMount() {

        const headers = new Headers({
            'Content-Type': 'application/json',
            'X-Auth-Token': this.state.token
        });

        const fetchInit = {
            method: "GET",
            headers: headers
        };

        fetch('http://localhost:6543/api/approval_restaurants', fetchInit)
            .then(response => (response.status === 403 ? this.setState({needRedirection: true,
                                                                        success: false}): response.json()))
            .then(data => this.setState({unapprovedRestaurants: data.data,
                                         success: data.success, error: data.error}))
            .catch(err => this.setState({success: false, error: err.message}))
    }

    handleRestaurantApprovement = (restaurant_id, request_method) => {

        const headers = new Headers({
            'Content-Type': 'application/json',
            'X-Auth-Token': this.state.token
        });

        const fetchInit = {
            method: request_method,
            headers: headers,
            body: JSON.stringify({id: restaurant_id}),
        };

        let operationName = "";
        if (request_method === "POST"){
          operationName = "Approved";
        }
        if (request_method === "DELETE"){
          operationName = "Disapproved";
        }

        fetch('http://localhost:6543/api/approval_restaurants', fetchInit)
            .then(response => (!(response.status >= 200 && response.status < 300)
                                 ?Promise.reject(response.status)
                                  :response.json()))
            .then(data => this.setState((prevState) => {
              return{
                success: data.success,
                unapprovedRestaurants: prevState.unapprovedRestaurants.filter(restaurantInfo => {return restaurantInfo.id!==restaurant_id}),
                snackbarOpen: true,
                snackbarMsg: operationName
              }
            }))
            .catch(err => this.setState({success: false, error: err, snackbarOpen: true, snackbarMsg: operationName}))
    };

    handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({ snackbarOpen: false });
    };

    render() {

        const {needRedirection, unapprovedRestaurants, success, error, snackbarOpen, snackbarMsg} = this.state;

        //prevent for rendering without fetch completing (init value is "null")
        if (success === null){
            return null;
        }

        if (needRedirection === true){
            const redirection = redirectToSignUp(error);
            return redirection;
        }
        else{
            if(success){
                return (
                    <React.Fragment>
                      <RestaurantsForApproval
                        unapprovedRestaurants={unapprovedRestaurants}
                        handleRestaurantApprovement={this.handleRestaurantApprovement}
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
            else{
                return(<GeneralError error={error}/>);
            }
        }
    }

}

export default RestaurantsForApprovalPage;
