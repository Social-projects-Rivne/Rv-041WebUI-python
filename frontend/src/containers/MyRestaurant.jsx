import React, { Component } from "react";
import RestaurantList from "../components/RestaurantList";
import AddUpdateRestaurant from "../components/Profile/AddUpdateRestaurant";
import withRest from "../HOC/withRest";

function MyRestaurant({ response, create }) {
  return (
    <>
      <RestaurantList restaurantList={response} />
      <AddUpdateRestaurant addRestaurant={create} />
    </>
  );
}

export default withRest(MyRestaurant)("api/user_restaurants");
