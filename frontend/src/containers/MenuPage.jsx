import React from "react";
import CategoriesList from "../components/MenuPage/CategoriesList";
import MenuItemList from "../components/MenuPage/MenuItemList";
import {
  Grid,
  Card,
  CardMedia,
  withStyles,
  IconButton,
  Slide,
  Typography,
  Snackbar,
  Divider
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PageContainer from "./PageContainer";
import OrderCartList from "../components/MenuPage/OrderCartList";
import GeneralError from "../components/ErrorPages/GeneralError";
import classnames from "classnames";
import SnackbarContent from "../components/SnackbarContent";

const styles = theme => ({
  image: { height: "100%", backgroundSize: "contain" },
  imageDiv: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    maxWidth: "1000px",
    maxHeight: "800px"
  },
  cart: {},
  cartButton: {
    transform: "rotate(-270deg)",
    transition: "transform 0.2s ease-in-out",
    "&.active": {
      transform: "rotate(270deg)"
    }
  }
});

class MenuPage extends React.Component {
  state = {
    Categories: [],
    Items: {},
    isImage: false,
    imageUrl: null,
    error: false,
    errorMes: null,
    heghtsList: [],
    activeCat: 0,
    isCartOpen: false,
    cartItems: [],
    SnackbarType: "",
    SnackbarMsg: "",
    isSnackbarOpen: false,
    orderDate: null,
    restaurantName: ""
  };

  componentDidMount() {
    const { restId, menuId } = this.props.match.params;
    const url =
      "http://localhost:6543/api/restaurant/" + restId + "/menu/" + menuId;
    fetch(url, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response =>
        response.status === 404
          ? this.setState({ error: true, errorMes: "" })
          : response.json()
      )
      .then(json => {
        if (json.data.isImage) {
          this.setState({
            isImage: true,
            imageUrl: json.data.imageUrl
          });
        } else {
          this.setState({
            Categories: json.data.Categories,
            Items: json.data.Items,
            restaurantName: json.data.restaurantName
          });
        }
      })
      .then(
        fetch("http://localhost:6543/api/order?rest_id=" + restId, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token")
          }
        })
          .then(response =>
            response.status === 404 || response.status === 403
              ? Promise.reject(response)
              : response.json()
          )
          .then(json => {
            if (json.data.items.length > 0) {
              this.setState({
                cartItems: json.data.items,
                SnackbarMsg: "Cart synchronized",
                isSnackbarOpen: true,
                SnackbarType: "info"
              });
            }
            localStorage.setItem("OrderId", json.data.id || null);
          })
          .catch(error => {
            localStorage.setItem("OrderId", null);
          })
      );
  }
  sendAddItem = (item, orderId) => {
    fetch("http://localhost:6543/api/order/" + orderId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        item_id: item.id,
        q_value: item.quantity
      })
    })
      .then(response =>
        [404, 403, 400].includes(response.status)
          ? response.json().then(Promise.reject())
          : response.json()
      )
      .then(json => {
        this.setState({
          cartItems: [...this.state.cartItems, item],
          SnackbarMsg: "Item was added",
          isSnackbarOpen: true,
          SnackbarType: "success"
        });
      })
      .catch(error =>
        this.setState({
          SnackbarMsg: error.error || "Somethind went wrong",
          isSnackbarOpen: true,
          SnackbarType: "error"
        })
      );
  };

  sendCreateOrder = item => {
    const orderId = localStorage.getItem("OrderId");
    if (orderId === "null" || orderId === "undefined") {
      fetch("http://localhost:6543/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({
          rest_id: this.props.match.params.restId
        })
      })
        .then(response =>
          [404, 403, 400].includes(response.status)
            ? response.json().then(Promise.reject())
            : response.json()
        )
        .then(json => {
          localStorage.setItem("OrderId", json.data.order_id);
          this.sendAddItem(item, json.data.order_id);
        })
        .catch(error =>
          this.setState({
            SnackbarMsg: error.error || "Somethind went wrong",
            isSnackbarOpen: true,
            SnackbarType: "error"
          })
        );
    } else {
      this.sendAddItem(item, orderId);
    }
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ isSnackbarOpen: false });
  };

  getCartItemIds = () => {
    return this.state.cartItems.map(item => {
      return item.id;
    });
  };

  handleCartExpand = item => {
    this.setState(state => ({ isCartOpen: !state.isCartOpen }));
  };

  handleAddItem = item => {
    this.sendCreateOrder(item);
    this.setState(state => ({ isCartOpen: true }));
  };

  handleRemoveItem = itemId => {
    const orderId = localStorage.getItem("OrderId");
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
        [404, 403, 400].includes(response.status)
          ? response.json().then(Promise.reject())
          : response.json()
      )
      .then(json => {
        const nextCart = this.state.cartItems.filter(item => {
          return item.id != itemId;
        });
        this.setState({
          cartItems: nextCart,
          SnackbarMsg: "Item was removed",
          isSnackbarOpen: true,
          SnackbarType: "success"
        });
      })
      .catch(error =>
        this.setState({
          SnackbarMsg: error.error || "Somethind went wrong",
          isSnackbarOpen: true,
          SnackbarType: "error"
        })
      );
  };

  QuantityTimeOut = false;

  handleQuantityChange = (event, quantity, itemId) => {
    const orderId = localStorage.getItem("OrderId");
    const quantity1 = parseInt(quantity);
    this.sendQuantityChange(orderId, quantity1, itemId);
  };

  sendQuantityChange = (orderId, quantity, itemId) => {
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
        [404, 403, 400].includes(response.status)
          ? response.json().then(Promise.reject())
          : response.json()
      )
      .then(json => {
        this.setState({
          SnackbarMsg: "Quantity changed to " + json.data.quantity,
          isSnackbarOpen: true,
          SnackbarType: "success"
        });
      })
      .catch(error => {
        this.setState({
          SnackbarMsg: error.error || "Somethind went wrong",
          isSnackbarOpen: true,
          SnackbarType: "error"
        });
      });
  };

  sendSubmitOrder = date => {
    const orderId = localStorage.getItem("OrderId");
    // let body1 = null;
    // if (date) {
    //   body1 = Object.assign({ action: "Submit" }, { book_date: date });
    // } else {
    //   body1 = { action: "Submit" };
    // }
    // console.log(body1);
    fetch("http://localhost:6543/api/order/" + orderId + "/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ action: "Submit" })
    })
      .then(response =>
        [404, 403, 400].includes(response.status)
          ? response.json().then(Promise.reject())
          : response.json()
      )
      .then(json => {
        localStorage.setItem("OrderId", null);
        this.setState({
          cartItems: [],
          isCartOpen: false,
          SnackbarMsg: "Order status changed to " + json.data,
          isSnackbarOpen: true,
          SnackbarType: "success"
        });
      })
      .catch(error => {
        this.setState({
          SnackbarMsg: error.error || "Somethind went wrong",
          isSnackbarOpen: true,
          SnackbarType: "error"
        });
      });
  };

  handleCatScroll = index => {
    if (this.state.activeCat !== index) {
      this.setState({ activeCat: index });
    }
  };

  render() {
    const { classes } = this.props;
    if (this.state.error) {
      return <GeneralError error={this.state.errorMes} />;
    } else {
      return (
        <PageContainer>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Typography variant="h5">
                {this.state.restaurantName} menu:
              </Typography>
              <Divider />
            </Grid>
          </Grid>

          {this.state.isImage && (
            <Card className={classes.imageDiv}>
              <CardMedia
                image={this.state.imageUrl}
                className={classes.image}
              />
            </Card>
          )}
          {!this.state.isImgetCartItemIdsage && (
            <Grid container spacing={16}>
              <Grid item xs={12} md={2}>
                <CategoriesList
                  cats={this.state.Categories}
                  active={this.state.activeCat}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <MenuItemList
                  items={this.state.Items}
                  cats={this.state.Categories}
                  scroll={this.handleCatScroll}
                  addItemHook={this.handleAddItem}
                  inCartItems={this.getCartItemIds()}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <IconButton
                  onClick={this.handleCartExpand}
                  aria-expanded={this.state.isCartOpen}
                  aria-label="Show cart"
                  className={classnames(classes.cartButton, {
                    active: this.state.isCartOpen
                  })}
                >
                  <ExpandMoreIcon />
                </IconButton>
                {"Cart"}
                {this.state.isCartOpen && (
                  <Slide
                    direction="left"
                    in={this.state.isCartOpen}
                    mountOnEnter
                  >
                    <OrderCartList
                      items={this.state.cartItems}
                      handleRemoveItem={this.handleRemoveItem}
                      handleQuantityChange={this.handleQuantityChange}
                      sendSubmitOrder={this.sendSubmitOrder}
                    />
                  </Slide>
                )}
              </Grid>
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                open={this.state.isSnackbarOpen}
                autoHideDuration={4000}
                onClose={this.handleSnackbarClose}
              >
                <SnackbarContent
                  onClose={this.handleSnackbarClose}
                  variant={this.state.SnackbarType}
                  message={
                    <Typography color="inherit" align="center">
                      {this.state.SnackbarMsg || "Something went wrong..."}
                    </Typography>
                  }
                />
              </Snackbar>
            </Grid>
          )}
        </PageContainer>
      );
    }
  }
}

export default withStyles(styles)(MenuPage);
