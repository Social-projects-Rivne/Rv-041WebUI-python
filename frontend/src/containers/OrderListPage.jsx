import React from "react";
import { Route, Switch } from "react-router-dom";
import { Snackbar, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import GenericTabs from "../Service/GenericTabs";
import UserOrders from "../components/UserOrders/UserOrders";
import SnackbarContent from "../components/SnackbarContent";
import { GetCurrentRouteLocation} from "../Service/functions"


const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  image: {
    height: 100,
    width: 133.5,
    backgroundSize: "contain",
    /*paddingTop: "56.25%" // 16:9*/
  },
  avatar: {
    margin: 10,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  }
});


class OrderListPage extends React.Component {
  state = {
    token: localStorage.getItem("token"),
    isLoading: true,
    success: true,
    statuses: [''],
    orders: [],
    selectedTab: 0,
    snackbarOpen: false,
    snackbarMsg: ""
  };

  componentDidMount() {

    let currentRouteLocation = GetCurrentRouteLocation(this.props.location.pathname, this.props.match.url);

    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": this.state.token
    });
    const route = "http://localhost:6543/api/profile/orders/" + this.props.status;
    const fetchInit = {
      method: "GET",
      headers: headers
    };

    fetch(route, fetchInit)
      .then(response =>
        !(response.status >= 200 && response.status < 300)
          ? Promise.reject.bind(Promise)
          : response.json()
      )
      .then(data =>
        this.setState(prevState => ({
          isLoading: false,
          statuses: [...prevState.statuses, ...data.data.statuses],
          selectedTab: [...prevState.statuses, ...data.data.statuses].indexOf(currentRouteLocation),
          orders: data.data.orders_data,
          success: data.success,
          error: data.error
        }))
      )
      .catch(err => this.setState({ success: false, error: err.message, isLoading: false }));
  }

  handleTabChange = (event, value) => {
    this.setState({ selectedTab: value })
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbarOpen: false });
  };


  handleOrderReordering = (orderId) => {

    const route = "http://localhost:6543/api/order";

    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": this.state.token
    });

    const fetchInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        baseOrderId: orderId,
      })
    };

    fetch(route, fetchInit)
    .then(response =>
      !(response.status >= 200 && response.status < 300)
        ? Promise.reject.bind(Promise)
        : response.json()
    )
    .then(data => {
      this.setState(prevState => {
        return {
          orders:  [...data.data.order_info, ...prevState.orders],
          success: data.success,
          error: data.error
        }
      })
    })
    .catch(err => this.setState({ 
      success: false,
      error: err.message,
      isLoading: false,
      snackbarOpen: true,
      snackbarMsg: "err.message",
    }));
  }

  handleOrderDecline = (orderId, currentStatus) => {

    let route     = ""; 
    let fetchInit = {};

    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": this.state.token
    });

    if (currentStatus === "Waiting for confirm") {
      route = "http://localhost:6543/api/order/" + orderId + "/status";
      fetchInit = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({
          new_status: "Declined",
          booked_time: Math.round(new Date()/1000)
        })
      }
    } else {
      route = "http://localhost:6543/api/order";
      fetchInit = {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify({
          orderId: orderId,
        })
      }
    }

    fetch(route, fetchInit)
      .then(response =>
        !(response.status >= 200 && response.status < 300)
          ? Promise.reject.bind(Promise)
          : response.json()
      )
      .then(data => {
        if (data.success) {
          this.setState(prevState => {
            if (currentStatus === "Waiting for confirm") {
              return {
                orders: prevState.orders.map(orderInfo => {
                  if (orderInfo.id === orderId) {
                    orderInfo.status = "Declined";
                    return orderInfo;
                  } else {
                    return orderInfo;
                  }
                }),
                success: true,
                snackbarOpen: true,
                snackbarMsg: "Order declined",
              }
            } else {
              return {
                orders: prevState.orders.filter(orderInfo => {
                  if (orderInfo.id === orderId) {
                    return false;
                  } else {
                    return true;
                  }
                }),
                success: true,
                snackbarOpen: true,
                snackbarMsg: "Order deleted",
              }
            }
          })
        }
      }
      )
      .catch(err => this.setState({ 
        success: false,
        error: err.message,
        isLoading: false,
        snackbarOpen: true,
        snackbarMsg: "err.message",
      }));
  };

  render() {
    const { classes, match } = this.props;
    const { 
      isLoading, 
      statuses, 
      orders, 
      selectedTab, 
      snackbarOpen,
      success,
      snackbarMsg 
    } = this.state;

    if (isLoading) {
      return null;
    }

    //create object with arrays for each status orders data
    let statusesObject = {};
    let statusesLenthObject = {};

    for (let i = 0; i < statuses.length; i++) {
      const status = statuses[i];
      statusesObject[status] = orders.filter(order => {
        if (status === "") {
          return true;
        }
        else {
          return (order.status === status);
        }
      });
      //also count array length for each status
      statusesLenthObject[status] = statusesObject[status].length;
    }

    return (
      <div className={classes.root}>
        <GenericTabs
          tags={statuses}
          tagsAdditionalInformation={statusesLenthObject}
          selectedValue={selectedTab}
          useRouter={true}
          fixedPath={match.url}
          handleTabChange={this.handleTabChange}
        />
        <Switch>
          {statuses.map((status, index) => {
            return(
              <Route
                path={((match.url.trim()).substr(-1) === "/" ? match.url : match.url + "/") + status}
                key={index}
                exact={true}
                render={() => <UserOrders
                  orders={statusesObject[status]}
                  handleOrderReordering={this.handleOrderReordering}
                  handleOrderDecline={this.handleOrderDecline}
                />}
              />
            );
          })}
        </Switch>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={snackbarOpen}
          autoHideDuration={success ? 4000 : null}
          onClose={this.handleSnackbarClose}
        >
          <SnackbarContent
            onClose={this.handleSnackbarClose}
            variant={success ? "success" : "error"}
            message={
              <Typography color="inherit" align="center">
                {snackbarMsg || success || "Something went wrong"}
              </Typography>
            }
          />
        </Snackbar>
      </div>
    );
  }

}

export default withStyles(styles)(OrderListPage);
