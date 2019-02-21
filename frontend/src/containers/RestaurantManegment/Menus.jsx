import React from "react";
import EnhancedTable from "./EnhancedTable";

class Menus extends React.Component {
  state = {
    menuItems: []
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
        this.setState({
          menuItems: json.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { menuItems } = this.state;
    return <EnhancedTable menuItems={menuItems} />;
  }
}

export default Menus;
