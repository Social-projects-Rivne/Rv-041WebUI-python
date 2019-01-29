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
  const { classes, id, name, description, address, phone, tags } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="https://media-cdn.tripadvisor.com/media/photo-f/04/43/20/9c/whisky-corner.jpg"
        title={name}
      />
      <CardContent className={classes.details}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h2">
              {name}
            </Typography>
          </Grid>
          {description && (
            <Grid item xs={12}>
              <Typography component="p">
                {description.length > 230
                  ? description.slice(0, 230) + "..."
                  : description}
              </Typography>
            </Grid>
          )}
          <Divider />
          <Grid item container justify="space-between">
            <Grid item>
              <Typography style={{ paddingRight: "16px" }} variant="subtitle2">
                Address: {address}
              </Typography>
            </Grid>
            {phone && (
              <Grid item>
                <Typography variant="subtitle2">Phone: {phone}</Typography>
              </Grid>
            )}
          </Grid>
          <Divider />
          {tags && tags.length !== 0 && (
            <Grid item xs={12}>
              {tags.map(tag => (
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
                to={"/profile/my_restaurant/" + id}
                color="primary"
              >
                details
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                component={Link}
                to={"/restaurant/" + id + "/menu/1"}
                color="primary"
              >
                Watch Menu
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

RestaurantListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  address: PropTypes.string,
  phone: PropTypes.string,
  tags: PropTypes.array
};

export default withStyles(styles)(RestaurantListItem);
