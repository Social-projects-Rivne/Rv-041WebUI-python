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
import classnames from "classnames";
import SnackbarContent from "../components/SnackbarContent";
import OrderConfirmDialog from "../components/MenuPage/OrderConfirm";
import { Redirect } from "react-router";

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
    restaurantName: "",
    isDialogOpen: false,
    redirectToLogin: false
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
      });
    this.handleSynch(restId);
  }

  handleSynch = restId => {
    const cart = localStorage.getItem("Cart");
    const orderId = localStorage.getItem("OrderId");
    const token = localStorage.getItem("token");
    const storageRestId = localStorage.getItem("RestId");

    if (cart && orderId == "Local" && storageRestId == restId) {
      this.setState(
        {
          cartItems: JSON.parse(cart),
          SnackbarMsg: "Cart synchronized",
          isSnackbarOpen: true,
          SnackbarType: "info"
        },
        () => {
          localStorage.removeItem("Cart");
          if (token) {
            this.handleAddItem(JSON.parse(cart));
          }
        }
      );
    } else {
      if (token != null) {
        this.sendSynch(restId, token);
      } else {
        localStorage.setItem("OrderId", "Local");
      }
    }
  };

  sendSynch = (restId, token) => {
    fetch("http://localhost:6543/api/order?rest_id=" + restId, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    })
      .then(response => {
        return [404, 403, 400].includes(response.status)
          ? Promise.reject.bind(Promise)
          : response.json();
      })
      .then(json => {
        if (json.data.items.length > 0) {
          this.setState({
            cartItems: json.data.items,
            SnackbarMsg: "Cart synchronized",
            isSnackbarOpen: true,
            SnackbarType: "info"
          });
        }
        localStorage.setItem("OrderId", json.data.id);
        localStorage.removeItem("Cart");
        localStorage.removeItem("RestId");
      })
      .catch(error => {
        localStorage.setItem("OrderId", "Local");
      });
  };

  sendAddItem = (item, orderId, push = true) => {
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
      .then(response => {
        [404, 400].includes(response.status)
          ? response.json().then(Promise.reject.bind(Promise))
          : response.json();
      })
      .then(json => {
        if (push) {
          this.setState({
            cartItems: [...this.state.cartItems, item],
            SnackbarMsg: "Item was added",
            isSnackbarOpen: true,
            SnackbarType: "success"
          });
        } else {
          this.setState({
            SnackbarMsg: "Item was added",
            isSnackbarOpen: true,
            SnackbarType: "success"
          });
        }
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
      .then(response => {
        return [404, 400].includes(response.status)
          ? response.json().then(Promise.reject.bind(Promise))
          : response.json();
      })
      .then(json => {
        if (json.data.order_id) {
          localStorage.setItem("OrderId", json.data.order_id);
          if (Array.isArray(item)) {
            item.forEach(i => {
              this.sendAddItem(i, json.data.order_id, false);
            });
          } else {
            this.sendAddItem(item, json.data.order_id);
          }
        } else {
          this.AddItemUnauth(item);
        }
      })
      .catch(error =>
        this.setState({
          SnackbarMsg: error.error || "Somethind went wrong",
          isSnackbarOpen: true,
          SnackbarType: "error"
        })
      );
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ isSnackbarOpen: false });
  };

  handleSnackbarMessage = (msg, type) => {
    this.setState({
      SnackbarMsg: msg,
      isSnackbarOpen: true,
      SnackbarType: type
    });
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
    const orderId = localStorage.getItem("OrderId");
    const token = localStorage.getItem("token");
    if (orderId == "Local") {
      if (token != null) {
        this.sendCreateOrder(item);
      } else {
        this.AddItemUnauth(item);
      }
    } else {
      if (Array.isArray(item)) {
        item.forEach(i => {
          this.sendAddItem(i, orderId, false);
        });
      } else {
        this.sendAddItem(item, orderId);
      }
    }
    this.setState(state => ({ isCartOpen: true }));
  };

  AddItemUnauth = item => {
    localStorage.setItem("OrderId", "Local");
    const { restId } = this.props.match.params;
    localStorage.setItem("RestId", restId);
    this.setState({
      cartItems: [...this.state.cartItems, item],
      SnackbarMsg: "Item was added",
      isSnackbarOpen: true,
      SnackbarType: "success"
    });
  };

  handleRemoveItem = itemId => {
    const orderId = localStorage.getItem("OrderId");

    if (orderId == "Local") {
      const nextCart = this.state.cartItems.filter(item => {
        return item.id != itemId;
      });
      this.setState({
        cartItems: nextCart,
        SnackbarMsg: "Item was removed",
        isSnackbarOpen: true,
        SnackbarType: "success"
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
        [404, 400].includes(response.status)
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
        if (index == inListIndex) {
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
    const orderId = localStorage.getItem("OrderId");
    if (!(quantity1 >= 1)) {
      quantity1 = 1;
    }
    this.sendQuantityChange(orderId, quantity1, itemId);
  };

  sendQuantityChange = (orderId, quantity, itemId) => {
    if (orderId == "Local") {
      this.setState({
        SnackbarMsg: "Quantity changed to " + quantity,
        isSnackbarOpen: true,
        SnackbarType: "success"
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
        [404, 400].includes(response.status)
          ? response.json().then(Promise.reject.bind(Promise))
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

  sendSubmitOrder = inDate => {
    const orderId = localStorage.getItem("OrderId");
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
        if ([404, 403, 400].includes(response.status)) {
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
          isCartOpen: false,
          isDialogOpen: false,
          SnackbarMsg: "Order status changed to " + json.data.status,
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

  handleDialogToggle = () => {
    const user = localStorage.getItem("token");
    if (!user) {
      const { restId } = this.props.match.params;
      localStorage.setItem("RestId", restId);
      localStorage.setItem("Cart", JSON.stringify(this.state.cartItems));
      this.setState({ redirectToLogin: true });
    } else {
      this.setState(state => ({ isDialogOpen: !this.state.isDialogOpen }));
    }
  };

  handleCatScroll = index => {
    if (this.state.activeCat !== index) {
      this.setState({ activeCat: index });
    }
  };

  render() {
    const { classes } = this.props;
    if (this.state.redirectToLogin) {
      return <Redirect to="/log-in" />;
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
          {!this.state.isImage && (
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
                      handleDialogToggle={this.handleDialogToggle}
                    />
                  </Slide>
                )}
              </Grid>
            </Grid>
          )}
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
        </PageContainer>
      );
    }
  }
}

export default withStyles(styles)(MenuPage);
