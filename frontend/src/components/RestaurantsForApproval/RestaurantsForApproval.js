import React from "react";
import RestaurantForApproval from "./RestaurantForApproval";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function RestaurantsForApproval(props) {

    const {unapprovedRestaurants, handleRestaurantApprovement} = props;

    return(
      <Grid container direction="row" alignItems="center" spacing={8}>
        {unapprovedRestaurants.map(restaurantInfo => {
          return <Grid item xs={6} key={restaurantInfo.id}>

            <RestaurantForApproval
              key={restaurantInfo.id}
              restaurant={restaurantInfo}
              handleRestaurantApprovement={handleRestaurantApprovement}
            />
          </Grid>
        })}
      </Grid>
    );
}

export default RestaurantsForApproval;