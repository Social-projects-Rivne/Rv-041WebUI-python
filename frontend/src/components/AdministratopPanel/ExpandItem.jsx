import React from "react";
import {
  withStyles,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Button,
  Chip
} from "@material-ui/core";
import OrderItemsList from "../MenuPage/OrderItemsList";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import WaitersRadio from "./WaitersRadio";
import format from 'date-fns/format';

const styles = theme => ({
  wrapper:{
    width: "100%",
    marginTop: 16,
    padding: "16px",
  },
  wrapperSummary:{
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between"
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
        new_status: "Assigned waiter"
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
  sendAccepted = (orderId, index) => {
        const headers = new Headers({
            "Content-Type": "application/json",
            "X-Auth-Token": localStorage.getItem("token")
        });
        const fetchInit = {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({
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
  handleWaiterPick = e => {
    this.setState({ pickedWaiter: e.target.value });
  };

  handleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { classes, order, index } = this.props;
    console.log(this.props.waiters);
    return (
      <ExpansionPanel
        expanded={this.state.expanded}
        onChange={this.handleExpand}
        className={classes.wrapper}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid
            container
            spacing={16}
            justify="space-between"
            alignItems="center"
          >
            <Grid item spacing={16} container xs={4} className={classes.wrapperSummary}>
              <Grid item>
                <Typography gutterBottom>
                  Order id: #{order.id}
                </Typography>
              </Grid>
              <Grid item alignContent="center">
                <Chip
                  label={order.status}
                  color="primary"
                  style={{ marginRight: "16px" }}
                />
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Typography gutterBottom component="p">
                User: {order.user.name || ""}
                  {order.status == "Assigned waiter" && (<>
                      <br/>
                      Waiter: {this.props.waiters.filter(item =>(item.id === order.waiter_id))[0].name}
                      </>) }

              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography gutterBottom component="p">
                Time created: {format(order.creation_time * 1000, "HH:mm dd.MM") || ""}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography gutterBottom component="p">
                Booked at: {format(order.booked_time * 1000, "HH:mm dd.MM") || ""}
              </Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <OrderItemsList cartItems={order.items || []} />
            </Grid>
            <Grid
              container
              alignItems="center"
              justify="flex-end"
              style={{ padding: "8px" }}
            >
                {this.props.order.status === "Accepted" && (
                    <>
                        <Grid item xs={9}>
                            <WaitersRadio
                                waiters={this.props.waiters}
                                pickedWaiter={this.state.pickedWaiter}
                                handleWaiterPick={this.handleWaiterPick}
                            />
                        </Grid>
                        <Grid item xs={2}>

                        </Grid>
                        <Grid item xs={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => this.handleAprove(order.id, index)}
                            >
                                Assign
                            </Button>
                        </Grid>
                    </>
                )}
                {this.props.order.status === "Waiting for confirm" && (
                        <Grid item xs={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => this.sendAccepted(order.id, index)}
                            >
                                Accept
                            </Button>
                        </Grid>
                )}

            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(ExpandItem);
