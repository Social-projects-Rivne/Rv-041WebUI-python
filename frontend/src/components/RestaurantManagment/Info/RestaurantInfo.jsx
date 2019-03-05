import React from "react";

import { Grid, Typography } from "@material-ui/core";

const RestaurantInfo = props => {
  return (
    <div style={{ padding: 8 }}>
      <Grid container spacing={16}>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Name:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="subtitle2">{props.info.name}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Address:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle2">{props.info.address_id}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Created:</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle2">
            {Date.parse(Number(props.info.creation_date))}
          </Typography>
        </Grid>
        {props.info.phone && (
          <>
            <Grid item xs={3}>
              <Typography variant="subtitle2">Phone:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle2">{props.info.phone}</Typography>
            </Grid>
          </>
        )}
        {props.info.description && (
          <>
            <Grid item xs={3}>
              <Typography variant="subtitle2">Prewiev text:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle2">
                {props.info.description}
              </Typography>
            </Grid>
          </>
        )}
        {props.info.description_markup && (
          <>
            <Grid item xs={3}>
              <Typography variant="subtitle2">Description:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle2">
                {props.info.description_markup}
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default RestaurantInfo;
