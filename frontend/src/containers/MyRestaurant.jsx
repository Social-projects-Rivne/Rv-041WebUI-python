import React, { Component } from "react";
import RestaurantList from "../components/RestaurantList";
import AddUpdateRestaurant from "../components/Profile/AddUpdateRestaurant";
import withRest from "../HOC/withRest";

function MyRestaurant({ response, create, get }) {
  return (
    <>
      <RestaurantList getList={get} restaurantList={response} />
      <AddUpdateRestaurant addRestaurant={create} />
    </>
  );
}

export default withRest(MyRestaurant)("user_restaurants");
