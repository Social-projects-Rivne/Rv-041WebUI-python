import React from "react";
import PropTypes from "prop-types";
import RestaurantListItem from "./RestaurantListItem";
import { Grid, Grow } from "@material-ui/core/";

const RestaurantList = props => {
  const { data } = props;
  console.log(data);
  return (
    <Grid container spacing={16}>
      {data.map((rest, index) => {
        return (
          <Grow
            in={true}
            key={rest.id}
            {...(data ? { timeout: Math.atan(index + 1) * 1500 } : {})}
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

RestaurantList.propTypes = {
  data: PropTypes.array.isRequired
};

export default RestaurantList;
