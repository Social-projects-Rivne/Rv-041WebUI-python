import React from "react";
import PropTypes from "prop-types";
import RestaurantListItem from "./RestaurantListItem";
import { Grid, Grow } from "@material-ui/core/";

const RestaurantList = props => {
  const { data } = props;
  return (
    <Grid container spacing={16}>
      {data.map((rest, index) => {
        return (
          <Grow
            in={data}
            key={rest.id}
            {...(data ? { timeout: Math.atan(index) * 2500 } : {})}
          >
            <Grid item xs={12}>
              <RestaurantListItem showDetails restData={rest} />
            </Grid>
          </Grow>
        );
      })}
    </Grid>
  );
};

console.log("sss");

RestaurantList.propTypes = {
  data: PropTypes.array.isRequired
};

export default RestaurantList;
