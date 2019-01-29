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
            <RestaurantListItem
              id={rest.id}
              name={rest.name}
              description={rest.description}
              address={rest.address_id}
              phone={rest.phone}
              tags={rest.tags}
              status={rest.status}
            />
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
