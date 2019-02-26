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
import { amber, green } from "@material-ui/core/colors/";
import { Link } from "react-router-dom";
import RestaurantListItemMenu from "../../components/RestaurantList/RestaurantListItemMenu";

const styles = theme => ({
  card: {
    display: "flex",
    flexWrap: "wrap",
    // width : "40%"
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
    display: "flex",
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
const OrderInfo ={
  time: " 25.05.2019 19.00",
  orderId : "1234",
  name : "Vitalii Bondar",
  price : "250$",
  phone: "+380973232323",
};

function OrderListItem(props) {
  const { classes, restData} = props;


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
              Order id #{OrderInfo.orderId}
            </Typography>
              <Typography
                  className={classes.itemName}
                  variant="subtitle2"
                  align="left"
              >
                  Client: {OrderInfo.name}
              </Typography>
              <Typography
                  className={classes.itemName}
                  variant="subtitle2"
                  align="center"
              >
                  Booking time: {OrderInfo.time}
              </Typography>
              <Grid item>
                  <Button
                      variant="contained"
                      component={Link}
                      to={"/administrator-panel/order/" + restData.id}
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
