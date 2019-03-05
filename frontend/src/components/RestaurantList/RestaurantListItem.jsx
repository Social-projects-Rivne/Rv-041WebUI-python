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
import { amber, green } from "@material-ui/core/colors/";
import { Link } from "react-router-dom";
import RestaurantListItemMenu from "./RestaurantListItemMenu";
import { ArchiveContext } from "../../containers/MyRestaurants";

const styles = theme => ({
  card: {
    display: "flex",
    flexWrap: "wrap"
  },
  itemName: {
    flex: 1
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
  },
  active: {
    background: green[500]
  },
  notApproved: {
    background: amber[700]
  }
});

const restaurantStatus = {
  0: ["NOT APPROVED", "notApproved"],
  1: ["ACTIVE", "active"],
  2: ["ARCHIVED"]
};

function RestaurantListItem(props) {
  const { classes, theme, restData, showDetails } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={restData.image}
        title={restData.name}
      />
      <CardContent className={classes.details}>
        <Grid container spacing={16}>
          <Grid
            item
            container
            xs={12}
            justify="space-between"
            alignItems="center"
          >
            <Typography
              className={classes.itemName}
              variant="h5"
              component="h2"
              align="left"
            >
              {restData.name}
            </Typography>
            {showDetails && (
              <>
                <Chip
                  label={restaurantStatus[restData.status][0]}
                  className={classes[restaurantStatus[restData.status][1]]}
                  style={{ marginRight: "16px" }}
                />
                <ArchiveContext.Consumer>
                  {ctx => (
                    <RestaurantListItemMenu restData={restData} ctx={ctx} />
                  )}
                </ArchiveContext.Consumer>
              </>
            )}
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
              <Typography
                style={{ paddingRight: theme.spacing.unit * 2 }}
                variant="subtitle2"
              >
                Address: {restData.address_id}
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
          {showDetails && (
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
                to={`restaurants/${restData.id}`}
                color="primary"
              >
                details
              </Button>
            </Grid>
            {restData.menu.length > 0 && (
              <Grid item>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/restaurant/${restData.id}/menu/${
                    (restData.menu.find(item => item.primary) || restData.menu[0]).id
                  }`}
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

RestaurantListItem.defaultProps = {
  showDetails: false
};

RestaurantListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  restData: PropTypes.object.isRequired,
  showDetails: PropTypes.bool,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(RestaurantListItem);
