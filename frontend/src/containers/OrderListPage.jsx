import React from "react";
import { Route, Switch } from "react-router-dom";
import { Snackbar, Typography } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import GenericTabs from "../Service/GenericTabs";
import UserOrders from "../components/UserOrders/UserOrders";
import SnackbarContent from "../components/SnackbarContent";
import OrderConfirmDialog from "../components/MenuPage/OrderConfirm";
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
    snackbarMsg: "",
    isDialogOpen: false,
    orderId: "Local",
    cartItems: [],
    restId: null,
    redirectToLogin: false,
    snackbarType: "info"
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


  handleOrderReordering = (orderId, rest_id) => {

    const route = "http://localhost:6543/api/order";
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": this.state.token
    });

    const fetchInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        rest_id: rest_id,
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
            isDialogOpen: true,
            cartItems: data.data.order_info.items,
            orderId: data.data.order_info.id, 
            restId: rest_id,
            success: data.success,
          }
        })
      })
      .catch(err => this.setState({ 
        success: false,
        error: err.message,
        isLoading: false,
        snackbarOpen: true,
        snackbarMsg: err.message,
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
            return {
              orders: prevState.orders.filter(orderInfo => {
                if (orderInfo.id === orderId) {
                  if (currentStatus === "Waiting for confirm") {
                    orderInfo.status = "Declined";
                  }
                  return false;
                } else {
                  return true;
                }
              }),
              success: true,
              snackbarOpen: true,
              snackbarMsg: currentStatus === "Waiting for confirm" ? "Order declined" : "Order deleted",
            }
          })
        } else {
          this.setState({
              success: false,
              snackbarOpen: true,
              snackbarMsg: "Operation failed",
            }
          )
        }
      })
      .catch(err => this.setState({ 
        success: false,
        error: err.message,
        isLoading: false,
        snackbarOpen: true,
        snackbarMsg: "err.message",
      }));
  };

  //order confirm dialog methods

  handleDialogToggle = () => {
    const user = localStorage.getItem("token");
    if (!user) {
      const { restId } = this.state;
      localStorage.setItem("RestId", restId);
      localStorage.setItem("Cart", JSON.stringify(this.state.cartItems));
      this.setState({ redirectToLogin: true });
    } else {
      this.setState(state => ({ isDialogOpen: !this.state.isDialogOpen }));
    }
  };

  handleRemoveItem = itemId => {

    let orderId = this.state.orderId;
    if (!orderId) {
      orderId = localStorage.getItem("OrderId");
    }

    if (orderId === "Local") {
      const nextCart = this.state.cartItems.filter(item => {
        return item.id !== itemId;
      });
      this.setState({
        cartItems: nextCart,
        snackbarMsg: "Item was removed",
        snackbarOpen: true,
      });
      return null;
    }

    fetch("http://localhost:6543/api/order/" + orderId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        item_id: itemId
      })
    })
      .then(response =>
        !(response.status >= 200 && response.status < 300)
          ? response.json().then(Promise.reject())
          : response.json()
      )
      .then(json => {
        const nextCart = this.state.cartItems.filter(item => {
          return item.id !== itemId;
        });
        this.setState({
          cartItems: nextCart,
          snackbarMsg: "Item was removed",
          snackbarOpen: true,
        });
      })
      .catch(error =>
        this.setState({
          snackbarMsg: error.error || "Somethind went wrong",
          snackbarOpen: true,
        })
      );
  };


  handleQuantityChange = (
    event,
    quantity,
    itemId,
    inList = false,
    inListIndex = 0
  ) => {
    let quantity1 = parseInt(event.target.value);
    if (inList) {
      const newItems = this.state.cartItems.map((item, index) => {
        if (index === inListIndex) {
          if (quantity1 >= 1) {
            item.quantity = quantity1;
            return item;
          } else {
            item.quantity = 1;
            return item;
          }
        } else {
          return item;
        }
      });
      this.setState({ cartItems: newItems });
    }

    let orderId = this.state.orderId;
    if (!orderId) {
      orderId = localStorage.getItem("OrderId");
    }
    
    if (!(quantity1 >= 1)) {
      quantity1 = 1;
    }
    this.sendQuantityChange(orderId, quantity1, itemId);
  };

  sendQuantityChange = (orderId, quantity, itemId) => {
    if (orderId === "Local") {
      this.setState({
        snackbarMsg: "Quantity changed to " + quantity,
        snackbarOpen: true,
      });
      return null;
    }
    fetch("http://localhost:6543/api/order/" + orderId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        item_id: itemId,
        quantity: quantity
      })
    })
      .then(response =>
        !(response.status >= 200 && response.status < 300)
          ? response.json().then(Promise.reject.bind(Promise))
          : response.json()
      )
      .then(json => {
        this.setState({
          snackbarMsg: "Quantity changed to " + json.data.quantity,
          snackbarOpen: true,
        });
      })
      .catch(error => {
        this.setState({
          snackbarMsg: error.error || "Somethind went wrong",
          snackbarOpen: true,
        });
      });
  };


  sendSubmitOrder = inDate => {

    let orderId = this.state.orderId;
    if (!orderId) {
      orderId = localStorage.getItem("OrderId");
    }
    
    fetch("http://localhost:6543/api/order/" + orderId + "/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        new_status: "Waiting for confirm",
        booked_time: Math.round(inDate / 1000)
      })
    })
      .then(response => {
        if ( !(response.status >= 200 && response.status < 300)) {
          return response.json().then(json => {
            throw json;
          });
        } else {
          return response.json();
        }
      })
      .then(json => {
        localStorage.setItem("OrderId", "Local");
        this.setState({
          cartItems: [],
          orderId:"Local",  
          isDialogOpen: false,
          snackbarMsg: "Order status changed to " + json.data.status,
          snackbarOpen: true,
        });
      })
      .catch(error => {
        this.setState({
          snackbarMsg: error.error || "Somethind went wrong",
          snackbarOpen: true,
        });
      });
  };

  handleSnackbarMessage = (msg, type) => {
    this.setState({
      snackbarMsg: msg,
      snackbarOpen: true,
      snackbarType: "info"
    });
  };

  //********************* */

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

        {this.state.isDialogOpen && (
            <OrderConfirmDialog
              open={this.state.isDialogOpen}
              handleClickToggle={this.handleClickToggle}
              cartItems={this.state.cartItems}
              handleDialogToggle={this.handleDialogToggle}
              handleRemoveItem={this.handleRemoveItem}
              handleQuantityChange={this.handleQuantityChange}
              sendSubmitOrder={this.sendSubmitOrder}
              handleSnackbarMessage={this.handleSnackbarMessage}
            />
          )}
        
      </div>
    );
  }

}

export default withStyles(styles)(OrderListPage);
