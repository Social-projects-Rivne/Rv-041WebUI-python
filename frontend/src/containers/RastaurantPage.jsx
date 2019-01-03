import React from "react";
import RestaurantInfo from "../components/RestaurantDetails/RestaurantInfo";

const RestaurantPage = props => {
    return (
        <React.Fragment>
            <RestaurantInfo url={props}/>
        </React.Fragment>)
};

export default RestaurantPage;
