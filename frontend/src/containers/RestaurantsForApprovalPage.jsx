import React, {Component} from "react";
import GeneralError from "../components/ErrorPages/GeneralError";
import RestaurantsForApproval from "../components/RestaurantsForApproval/RestaurantsForApproval";
import {redirectToSignUp} from "../Service/NeedAuthorization";


class RestaurantsForApprovalPage extends Component {

    state = {
        needRedirection: false,
        success: null,
        error: "",
        token: localStorage.getItem("token"),
        unapprovedRestaurants: [],
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
            .then(response => (response.status === 403 ? this.setState({needRedirection: true, success: false}): response.json()))
            .then(data => this.setState({unapprovedRestaurants: data.data, success: data.success, error: data.error}))
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

        fetch('http://localhost:6543/api/approval_restaurants', fetchInit)
            .then(response => (response.status === 403 ? this.setState({needRedirection: true, success: false}): response.json()))
            .then(data => this.setState((prevState) => {
              return{
                success: data.success,
                unapprovedRestaurants: prevState.unapprovedRestaurants.filter(restaurantInfo => {return restaurantInfo.id!==restaurant_id})
              }
            }))
            .catch(err => this.setState({success: false, error: err.message}))
    };


    render() {

        const {needRedirection, unapprovedRestaurants, success, error} = this.state;

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
