import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Card,
  Button,
  Typography,
  CardContent,
  Grid
} from "@material-ui/core/";
import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    display: "flex",
    flexWrap: "wrap"
  },
  itemName: {
    flex: 1
  },
  details: {
    flex: 9999,
    minWidth: "25em",
    display: "flex"
  }
});

function handlerChangeDate(date) {
  let u = new Date(date * 1000);
  return (
    u.getUTCFullYear() +
    "-" +
    ("0" + u.getUTCMonth()).slice(-2) +
    "-" +
    ("0" + u.getUTCDate()).slice(-2) +
    " " +
    ("0" + u.getUTCHours()).slice(-2) +
    ":" +
    ("0" + u.getUTCMinutes()).slice(-2) +
    ":" +
    ("0" + u.getUTCSeconds()).slice(-2)
  );
}

function OrderListItem(props) {
  const { classes, orderData } = props;

  return (
    <Card className={classes.card}>
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
              variant="subtitle2"
              align="left"
            >
              Order id #{orderData.id}
            </Typography>
            <Typography
              className={classes.itemName}
              variant="subtitle2"
              align="left"
            >
              Client: {orderData.user.name}
            </Typography>
            <Typography
              className={classes.itemName}
              variant="subtitle2"
              align="center"
            >
              Creating time: {handlerChangeDate(orderData.creation_time)}
            </Typography>
            <Grid item>
              <Button
                variant="contained"
                component={Link}
                to={"/administrator-panel/order/" + orderData.id}
                color="primary"
              >
                Show more
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

OrderListItem.defaultProps = {
  showDetails: false
};

OrderListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  restData: PropTypes.object.isRequired,
  showDetails: PropTypes.bool,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(OrderListItem);
