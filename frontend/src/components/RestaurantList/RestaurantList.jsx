import React from "react";
import PropTypes from "prop-types";
import RestaurantListItem from "./RestaurantListItem";
import { Grid } from "@material-ui/core/";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import {Link} from "react-router-dom";

const RestaurantList = props => {
  const { data } = props;
  return (
    <Grid container spacing={16}>
        {/*<Tabs value="ok" variant="scrollable" scrollButtons="on">*/}
            {/*<Tab label="Active" component={Link} to={{ search: "" }} />*/}
            {/*<Tab label="Not approved" component={Link} to={{ search: "" }} />*/}
            {/*<Tab label="Archive" component={Link} to={{ search: "" }} />*/}
        {/*</Tabs>*/}
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
