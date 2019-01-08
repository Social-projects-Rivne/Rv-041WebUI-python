import React from "react";
import RestaurantItem from "../components/RestaurantItem";
import { withStyles, Grid } from "@material-ui/core/";

const styles = theme => ({
  root: {},
});

const RestaurantList = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <RestaurantItem />
        </Grid>
        <Grid item xs={12}>
          <RestaurantItem />
        </Grid>
        <Grid item xs={12}>
          <RestaurantItem />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(RestaurantList);
