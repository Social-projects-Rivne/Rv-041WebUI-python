import React from "react";
import PropTypes from "prop-types";

import MenuTable from "../../components/RestaurantManagment/Menu/MenuTable";
import MenuImage from "../../components/RestaurantManagment/Menu/MenuImage";

import { MenuContext } from "./RestaurantManagmentPage";

class ManageMenu extends React.Component {
  state = {
    menuItems: [],
    isImageMenu: false
  };

  componentDidMount() {
    const restId = this.props.restId;
    const menuId = this.props.match.params.id;

    fetch(
      `http://localhost:6543/api/restaurant/${restId}/menu/${menuId}?items=true`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        }
      }
    )
      .then(response => {
        return response.status >= 200 && response.status < 300
          ? response.json()
          : response.json().then(Promise.reject.bind(Promise));
      })
      .then(json => {
        "isImage" in json.data
          ? this.setState({
              menuItems: json.data.imageUrl,
              isImageMenu: json.data.isImage
            })
          : this.setState({
              menuItems: json.data
            });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleMenuItemAdd = newItem => {
    this.setState(prevState => ({
      menuItems: [newItem, ...prevState.menuItems]
    }));
  };

  handleUpdateMenu = updatedItem => {
    this.setState(prevState => {
      const newList = prevState.menuItems.map(item =>
        item.id === updatedItem.id ? updatedItem : item
      );
      return { menuItems: [...newList] };
    });
  };

  handleDeleteItem = deletedItem => {
    this.setState(prevState => ({
      menuItems: prevState.menuItems.filter(item => item.id !== deletedItem.id)
    }));
  };

  render() {
    const { menuItems, isImageMenu } = this.state;
    return (
      <MenuContext.Consumer>
        {ctx => {
          const menuName = ctx.menusList
            .filter(item => item.id === Number(this.props.match.params.id))
            .map(item => item.name)
            .toString();
          return isImageMenu ? (
            <MenuImage
              {...this.props}
              menuName={menuName}
              menuItems={menuItems}
            />
          ) : (
            <MenuTable
              {...this.props}
              restId={this.props.restId}
              onMenuItemAdd={this.handleMenuItemAdd}
              onUpdateItem={this.handleUpdateMenu}
              onDeleteItem={this.handleDeleteItem}
              menuName={menuName}
              menuItems={menuItems}
            />
          );
        }}
      </MenuContext.Consumer>
    );
  }
}

ManageMenu.propTypes = {
  restId: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired
};

export default ManageMenu;
