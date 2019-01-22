import React from "react";
import CategoriesList from "../components/MenuPage/CategoriesList";
import MenuItemList from "../components/MenuPage/MenuItemList";

class MenuPage extends React.Component {
  state = {
    Categories: [],
    Items: []
  };

  componentDidMount() {
    console.log(this.props);
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

  render() {
    return (
      <>
        <CategoriesList cats={this.state.Categories} />
        {/* <MenuItemList items={this.state.Items} /> */}
      </>
    );
  }
}

export default MenuPage;
