import React from "react";
import RestaurantItem from "../components/RestaurantItem";
import {
  withStyles,
  Card,
  Grid,
  Paper,
  Divider,
  CardHeader,
  CardContent,
} from "@material-ui/core/";

const styles = theme => ({
  root: {
    paddingLeft: 24,
    paddingRight: 24,
  },
});

const MyRestaurant = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Your restaurants:" />
            <Divider />
            <CardContent>
              <RestaurantItem />
              <RestaurantItem />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(MyRestaurant);
