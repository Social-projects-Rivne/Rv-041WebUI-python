import React from "react";
import RestaurantForApproval from "./RestaurantForApproval";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  }
});


function RestaurantsForApproval(props) {
  const { unapprovedRestaurants, 
          handleRestaurantApprovement,
          restaurantStatus,
          classes } = props;

  return (
    <Grid className={classes.root} container spacing={16}>
      {unapprovedRestaurants.map(restaurantInfo => {
        if (restaurantStatus.includes(restaurantInfo.status)) {
          return (
            <Grid item xs={12} md={6} lg={3} key={restaurantInfo.id}>
              <RestaurantForApproval
                key={restaurantInfo.id}
                restaurant={restaurantInfo}
                handleRestaurantApprovement={handleRestaurantApprovement}
              />
            </Grid>
          );
        } else {
          return null;
        }
      })}
    </Grid>
  );
}

export default withStyles(styles)(RestaurantsForApproval);
