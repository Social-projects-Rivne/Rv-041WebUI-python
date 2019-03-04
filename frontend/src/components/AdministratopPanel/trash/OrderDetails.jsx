import React from "react";
import {
  withStyles,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Link,
  Chip
} from "@material-ui/core";
import OrderItemsList from "../MenuPage/OrderItemsList";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import WaitersRadio from "./WaitersRadio";


const styles = theme => ({
  chip: {
    background: theme.palette.secondary.light,
    color: theme.palette.primary.dark
  }
});


class ExpandItem extends React.Component {
  state = {
    pickedWaiter: null,
    expanded: false
  };

  handleAprove = (orderId, index) => {
    if (this.state.pickedWaiter == null) {
      this.props.handleSnackbar("Pls pick waiter", "error");
    } else {
      this.sendAprove(orderId, index);
    }
  };

  sendAprove = (orderId, index) => {
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem("token")
    });
    const fetchInit = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify({
        set_waiter_id: parseInt(this.state.pickedWaiter),
        new_status: "Accepted"
      })
    };
    fetch("http://localhost:6543/api/order/" + orderId + "/status", fetchInit)
      .then(response => {
        if (response.status != 200) {
          throw "Something went wrong";
        } else {
          return response.json();
        }
      })
      .then(json => {
        this.props.changeStatus(index, json.data.status);
        this.props.handleSnackbar(
          "Order #" + orderId + " status changed to " + json.data.status,
          "success"
        );
      })
      .catch(err => {
        this.props.handleSnackbar(err, "error");
      });
  };

  render() {
    const { classes, order, index } = this.props;
    return (<Grid container spacing={16}>
  <Grid item xs={12}>
    <OrderItemsList cartItems={order.items || []} />
  </Grid>
  <Grid
    container
    alignItems="center"
    justify="flex-end"
    style={{ padding: "8px" }}
  >
    <Grid item xs={2}>
      <Button variant="contained" color="primary">
        disapprove
      </Button>
    </Grid>
    <Grid item xs={1}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => this.handleAprove(order.id, index)}
      >
        approve
      </Button>
    </Grid>
  </Grid>
</Grid>;)}
  }

