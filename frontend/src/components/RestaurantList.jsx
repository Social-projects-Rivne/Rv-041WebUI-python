import React from "react";
import RestaurantItem from "../components/RestaurantItem";
import { withStyles, Grid, CardContent } from "@material-ui/core/";

const styles = theme => ({
  root: {}
});

const RestaurantList = props => {
  const { classes, data } = props;
  console.log(data);
  return (
    <div className={classes.root}>
      {data.length !== 0 && (
        <CardContent>
          <Grid container spacing={16}>
            {data.map(rest => {
              return (
                <Grid key={rest.id} item xs={12}>
                  <RestaurantItem
                    id={rest.id}
                    name={rest.name}
                    description={rest.description}
                    address={rest.address_id}
                    phone={rest.phone}
                  />
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      )}
    </div>
  );
};

export default withStyles(styles)(RestaurantList);
