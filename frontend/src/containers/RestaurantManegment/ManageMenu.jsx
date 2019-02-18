import React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import EnhancedTable from "./EnhancedTable";

class ManageMenu extends React.Component {
  state = {
    menuItems: {},
    categories: []
  };

  componentDidMount() {
    const restId = this.props.match.params.id;
    const menuId = 1;
    fetch(`http://localhost:6543/api/restaurant/${restId}/menu/${menuId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    })
      .then(response => {
        return response.status >= 200 && response.status < 300
          ? response.json()
          : response.json().then(Promise.reject.bind(Promise));
      })
      .then(json => {
        this.setState({
          categories: json.data.Categories,
          menuItems: json.data.Items
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return <EnhancedTable />;
  }
}

export default ManageMenu;
