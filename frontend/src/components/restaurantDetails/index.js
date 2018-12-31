import React from 'react';
import RestaurantInfo from './restInfo';

const RestaurantDetails = (props) => {

    return (
        <div className="container-main">
            {/*<SearchRestaurant />*/}
            <RestaurantInfo url={props} />
        </div>
    )
};
export default RestaurantDetails;