import React, { Component } from "react";
import GeneralError from "../ErrorPages/GeneralError";
import Restaurants from "./Restaurants";
import { redirectToSignUp } from "../../Service/NeedAuthorization";

class RestaurantsPage extends Component {
  state = {
    needRedirection: false,
    success: null,
    error: "",
    restaurantsList: []
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

    fetch("http://localhost:6543/api/moderator/restaurants", fetchInit)
      .then(response =>
        response.status === 403
          ? this.setState({ needRedirection: true, success: false })
          : response.json()
      )
      .then(data =>
        this.setState({
          restaurantsList: data.data,
          success: data.success,
          error: data.error
        })
      )
      .then(() => {
        this.pushTabValues(this.state.restaurantsList);
      })
      .catch(err => this.setState({ success: false, error: err.message }));
  }

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
        if (tagValue.includes(info.status)){
          quantity = quantity + 1;
        }
      }
      additionalValues[tagName] = quantity;
    }
    return this.props.setAdditionalTabData(additionalValues)
  };

  render() {
    const {
      needRedirection,
      restaurantsList,
      success,
      error
    } = this.state;
    const { restaurantStatus } = this.props;

    //prevent for rendering without fetch completing (init value is "null")
    if (success === null) {
      return null;
    }

    if (needRedirection === true) {
      const redirection = redirectToSignUp(error);
      return redirection;
    } else {
      if (success) {
        return (
          <>
            <Restaurants
              restaurantsList={restaurantsList}
              restaurantStatus={restaurantStatus}
            />
          </>
        );
      } else {
        return <GeneralError error={error} />;
      }
    }
  }
}

export default RestaurantsPage;
