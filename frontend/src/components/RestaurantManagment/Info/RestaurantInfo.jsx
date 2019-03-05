import React from "react";

import {
  Grid,
  Typography,
  Chip,
  Avatar,
  CardMedia,
  Divider
} from "@material-ui/core";

import { makeDate } from "../../../Service/functions";

const RestaurantInfo = props => {
  return (
    <div style={{ padding: 16 }}>
      <Grid container spacing={24}>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Name:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="subtitle2">{props.info.name}</Typography>
        </Grid>

        {props.info.image && (
          <>
            <Grid item xs={3}>
              <Typography variant="subtitle2">Image:</Typography>
            </Grid>
            <Grid item xs={8}>
              <CardMedia
                style={{ width: 150, height: 150, borderRadius: 4 }}
                image={props.info.image}
              />
            </Grid>
          </>
        )}

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
            {makeDate(props.info.creation_date)}
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
        {props.info.description_markup !== "<p></p>" &&
          props.info.description_markup && (
            <>
              <Grid item xs={3}>
                <Typography variant="subtitle2">Description:</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="subtitle2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.info.description_markup
                    }}
                  />
                </Typography>
              </Grid>
            </>
          )}
        {props.info.tags && props.info.tags.length > 0 && (
          <>
            <Grid item xs={3}>
              <Typography variant="subtitle2">Tags:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle2">
                {props.info.tags.map(tag => (
                  <Chip style={{ margin: 4 }} key={tag.id} label={tag.name} />
                ))}
              </Typography>
            </Grid>
          </>
        )}
        {props.info.waiters && props.info.waiters.length > 0 && (
          <>
            <Grid item xs={3}>
              <Typography variant="subtitle2">Waiters:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle2">
                {props.info.waiters.map(waiter => (
                  <Chip
                    style={{ margin: 4 }}
                    avatar={<Avatar>{waiter.name[0].toUpperCase()}</Avatar>}
                    key={waiter.id}
                    label={waiter.name}
                  />
                ))}
              </Typography>
            </Grid>
          </>
        )}
        {props.info.administrator_id && (
          <>
            <Grid item xs={3}>
              <Typography variant="subtitle2">Administrator:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant="subtitle2">
                <Chip
                  style={{ margin: 4 }}
                  avatar={
                    <Avatar>
                      {props.info.administrator.name[0].toUpperCase()}
                    </Avatar>
                  }
                  label={props.info.administrator.name}
                />
              </Typography>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default RestaurantInfo;
