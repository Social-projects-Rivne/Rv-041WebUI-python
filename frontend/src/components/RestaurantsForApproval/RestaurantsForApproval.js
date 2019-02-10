import React from "react";
import RestaurantForApproval from "./RestaurantForApproval";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  }
});


function RestaurantsForApproval(props) {
  const { unapprovedRestaurants, 
          handleRestaurantApprovement,
          restaurantStatus,
          classes } = props;

  return (
    /*<Paper className={classes.root}>*/
    <Grid container spacing={16}>
      {unapprovedRestaurants.map(restaurantInfo => {
        if (restaurantStatus.indexOf(restaurantInfo.status) !== -1 ) {
          return (
            <Grid item xs={3} key={restaurantInfo.id}>
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
    /*</Paper>*/
  );
}

export default withStyles(styles)(RestaurantsForApproval);
