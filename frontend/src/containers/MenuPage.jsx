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
import OrderCart from "../components/MenuPage/OrderCart";
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
      });
  }

  handleCartExpand = item => {
    this.setState(state => ({ isCartOpen: !state.isCartOpen }));
  };

  handleAddItem = item => {
    this.setState(state => ({ isCartOpen: true }));
    this.state.cartItems.push(item);
  };

  handleCatScroll = index => {
    if (this.state.activeCat !== index) {
      this.setState({ activeCat: index });
    }
  };

  render() {
    console.log("1");
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
                    <OrderCart items={this.state.cartItems} />
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
