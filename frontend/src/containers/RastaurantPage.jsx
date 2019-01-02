import React from "react";
import RestaurantInfo from "../components/RestaurantDetails/RestaurantInfo";
import "../components/RestaurantList/style.css";

const RestaurantPage = props => {
  console.log("sss",props);
  return  (<div className="container-main">
    <RestaurantInfo url={props} />
  </div>)
};

export default RestaurantPage;
