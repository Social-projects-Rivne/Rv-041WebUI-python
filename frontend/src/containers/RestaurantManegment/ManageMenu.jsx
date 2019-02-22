import React from "react";
import PropTypes from "prop-types";

import MenuTable from "../../components/RestaurantManagment/MenuTable";
import MenuImage from "../../components/RestaurantManagment/MenuImage";

class ManageMenu extends React.Component {
  state = {
    menu: [],
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
              menu: json.data.imageUrl,
              isImageMenu: json.data.isImage
            })
          : this.setState({
              menu: json.data
            });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { menu, isImageMenu } = this.state;
    return isImageMenu ? <MenuImage menu={menu} /> : <MenuTable menu={menu} />;
  }
}

ManageMenu.propTypes = {
  restId: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired
};

export default ManageMenu;
