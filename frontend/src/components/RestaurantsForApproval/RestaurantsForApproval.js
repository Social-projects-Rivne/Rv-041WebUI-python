import React from "react";
import RestaurantForApproval from "./RestaurantForApproval";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

function RestaurantsForApproval(props) {
  const { unapprovedRestaurants, handleRestaurantApprovement } = props;

  return (
    <Grid container spacing={16}>
      {unapprovedRestaurants.map(restaurantInfo => {
        if (restaurantInfo.status === 0) {
          return (
            <Grid item xs={12} md={6} lg={3} key={restaurantInfo.id}>
              <RestaurantForApproval
                key={restaurantInfo.id}
                restaurant={restaurantInfo}
                handleRestaurantApprovement={handleRestaurantApprovement}
              />
            </Grid>
          );
        }
      })}
    </Grid>
  );
}

export default RestaurantsForApproval;
