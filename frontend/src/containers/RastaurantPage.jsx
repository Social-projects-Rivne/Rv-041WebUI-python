import React, { Component } from "react";
import RestaurantInfo from "../components/RestaurantDetails/RestaurantInfo";
import AddUpdateRestaurant from "../components/Profile/AddUpdateRestaurant";
import withRest from "../HOC/withRest";

function RastaurantPage({ response }) {
  return (
    <>
      <RestaurantInfo restaurantItem={response} />
      {/* <AddUpdateRestaurant
        requestType="put"
        onUpdate={this.handleUpdateRestaurant}
        id={this.props.match.params.id}
      />*/}
    </>
  );
}

export default withRest(RastaurantPage)("api/user_restaurant");
