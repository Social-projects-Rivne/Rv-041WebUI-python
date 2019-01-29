import React from "react";
import PropTypes from "prop-types";
import RestaurantListItem from "./RestaurantListItem";
import { Grid } from "@material-ui/core/";

const RestaurantList = props => {
  const { data } = props;
  return (
    <Grid container spacing={16}>
      {data.map(rest => {
        return (
          <Grid key={rest.id} item xs={12}>
            <RestaurantListItem showDetails restData={rest} />
          </Grid>
        );
      })}
    </Grid>
  );
};

RestaurantList.propTypes = {
  data: PropTypes.array.isRequired
};

export default RestaurantList;
