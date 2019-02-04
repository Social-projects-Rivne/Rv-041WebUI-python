import React from "react";
import CategoriesList from "../components/MenuPage/CategoriesList";
import MenuItemList from "../components/MenuPage/MenuItemList";
import { Grid, Card, CardMedia, withStyles } from "@material-ui/core";
import PageContainer from "./PageContainer";
import GeneralError from "../components/ErrorPages/GeneralError";
import CollapseForm from "../components/CollapseForm";
import AddMenuItemForm from "../components/MenuPage/AddMenuItemForm";

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
    activeCat: 0
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
              <Grid item xs={12} md={10}>
                <MenuItemList
                  items={this.state.Items}
                  cats={this.state.Categories}
                  scroll={this.handleCatScroll}
                />
                <CollapseForm
                  tooltipText="Add menu item"
                  formTitle="Create new menu item:"
                >
                  <AddMenuItemForm />
                </CollapseForm>
              </Grid>
            </Grid>
          )}
        </PageContainer>
      );
    }
  }
}

export default withStyles(styles)(MenuPage);
