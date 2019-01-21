import React from "react";
import PropTypes from "prop-types";
import RestaurantItem from "../components/RestaurantItem";
import { withStyles, Grid, CardContent } from "@material-ui/core/";

const RestaurantList = props => {
  const { classes, response } = props;

  return (
    <div>
      <CardContent>
        <Grid container spacing={16}>
          {response.data.map(rest => {
            return (
              <Grid key={rest.id} item xs={12}>
                <RestaurantItem
                  id={rest.id}
                  name={rest.name}
                  description={rest.description}
                  address={rest.address_id}
                  phone={rest.phone}
                  tags={rest.tags}
                />
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </div>
  );
};

export default RestaurantList;

RestaurantList.propTypes = {
  response: PropTypes.object.isRequired
};
