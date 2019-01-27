import React from "react";
import RestaurantForApproval from "./RestaurantForApproval";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function RestaurantsForApproval(props) {

    const {unapprovedRestaurants, handleRestaurantApprovement} = props;

    return(
      <Grid container justify="center" direction="row" alignItems="center" spacing={16} alignContent="stretch">
        {unapprovedRestaurants.map(restaurantInfo => {
          return <Grid item xs={12} max-width="50%" key={restaurantInfo.id}>

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