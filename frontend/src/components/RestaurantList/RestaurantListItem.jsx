import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Card,
  CardMedia,
  Button,
  Typography,
  CardContent,
  Divider,
  Chip,
  Grid
} from "@material-ui/core/";

import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    display: "flex",
    flexWrap: "wrap"
  },
  media: {
    flex: 1,
    minWidth: theme.spacing.unit * 30,
    minHeight: theme.spacing.unit * 30
  },
  details: {
    flex: 9999,
    minWidth: "25em",
    display: "flex"
  },
  tagItem: {
    margin: theme.spacing.unit / 2
  }
});

function RestaurantListItem(props) {
  const { classes, restData } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="https://media-cdn.tripadvisor.com/media/photo-f/04/43/20/9c/whisky-corner.jpg"
        title={restData.name}
      />
      <CardContent className={classes.details}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h2">
              {restData.name}
            </Typography>
          </Grid>
          {restData.description && (
            <Grid item xs={12}>
              <Typography component="p">
                {restData.description.length > 230
                  ? restData.description.slice(0, 230) + "..."
                  : restData.description}
              </Typography>
            </Grid>
          )}
          <Divider />
          <Grid item container justify="space-between">
            <Grid item>
              <Typography style={{ paddingRight: "16px" }} variant="subtitle2">
                Address: {restData.address}
              </Typography>
            </Grid>
            {restData.phone && (
              <Grid item>
                <Typography variant="subtitle2">
                  Phone: {restData.phone}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Divider />
          {restData.tags && restData.tags.length !== 0 && (
            <Grid item xs={12}>
              {restData.tags.map(tag => (
                <Chip
                  key={tag.name}
                  label={tag.name}
                  className={classes.tagItem}
                />
              ))}
            </Grid>
          )}
          <Grid
            style={{ marginTop: "auto" }}
            spacing={16}
            item
            container
            justify="flex-end"
          >
            <Grid item>
              <Button
                variant="contained"
                component={Link}
                to={"/profile/my_restaurant/" + restData.id}
                color="primary"
              >
                details
              </Button>
            </Grid>
            {restData.has_menu && (
              <Grid item>
                <Button
                  variant="contained"
                  component={Link}
                  to={"/restaurant/" + restData.id + "/menu/1"}
                  color="primary"
                >
                  Watch Menu
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

RestaurantListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  restData: PropTypes.object.isRequired
};

export default withStyles(styles)(RestaurantListItem);
