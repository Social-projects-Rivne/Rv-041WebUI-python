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
  Paper,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PageContainer from "./PageContainer";
import OrderCartList from "../components/MenuPage/OrderCartList";
import GeneralError from "../components/ErrorPages/GeneralError";
import classnames from "classnames";

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
    cartItems: []
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
            Items: json.data.Items
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
            console.log(json);
            this.setState({
              cartItems: json.data.items
            });
            localStorage.setItem("OrderId", json.data.id);
          })
          .catch(error => {
            console.log(error);
            localStorage.setItem("OrderId", null);
          })
      );
  }
  sendAddItem = (item, orderId) => {
    console.log(item);
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
        response.status === 404 || response.status === 403
          ? Promise.reject(response)
          : response.json()
      )
      .then(json => {
        console.log(json);
      })
      .catch(error => console.log(error));
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
          response.status === 404 || response.status === 403
            ? Promise.reject(response)
            : response.json()
        )
        .then(json => {
          this.sendAddItem(item, orderId);
          localStorage.setItem("OrderId", json.data.order_id);
        })
        .catch(error => console.log(error));
    } else {
      this.sendAddItem(item, orderId);
    }
  };

  handleCartExpand = item => {
    this.setState(state => ({ isCartOpen: !state.isCartOpen }));
  };

  handleAddItem = item => {
    const dublicates = this.state.cartItems.filter(sItem => {
      return sItem === item;
    });
    console.log(dublicates);
    if (dublicates.length == 0) {
      return 0;
    }
    this.state.cartItems.push(item);
    this.sendCreateOrder(item);
    this.setState(state => ({ isCartOpen: true }));
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
                  inCartItems={this.state.cartItems}
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
                    <OrderCartList items={this.state.cartItems} />
                  </Slide>
                )}
              </Grid>
            </Grid>
          )}
        </PageContainer>
      );
    }
  }
}

export default withStyles(styles)(MenuPage);
