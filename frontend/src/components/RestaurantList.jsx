import React from "react";
import PropTypes, { array } from "prop-types";
import RestaurantItem from "../components/RestaurantItem";
import { withStyles, Grid } from "@material-ui/core/";

const RestaurantList = props => {
  const { data } = props;
  return (
    <div>
      {data.length !== 0 && (
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
                  tags={rest.tags}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

RestaurantList.propTypes = {
  data: PropTypes.array.isRequired
};

export default RestaurantList;
