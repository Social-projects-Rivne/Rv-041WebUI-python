import React from "react";
import CategoriesList from "../components/MenuPage/CategoriesList";
import MenuItemList from "../components/MenuPage/MenuItemList";
import { Grid } from "@material-ui/core";
import PageContainer from "./PageContainer";

class MenuPage extends React.Component {
  state = {
    Categories: [],
    Items: {},
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
      .then(response => response.json())
      .then(json =>
        this.setState({
          Categories: json.data.Categories,
          Items: json.data.Items
        })
      );
  }

  handleCatScroll = index => {
    if (this.state.activeCat !== index) {
      console.log(index);
      this.setState({ activeCat: index });
    }
  };

  render() {
    return (
      <PageContainer>
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
          </Grid>
        </Grid>
      </PageContainer>
    );
  }
}

export default MenuPage;
