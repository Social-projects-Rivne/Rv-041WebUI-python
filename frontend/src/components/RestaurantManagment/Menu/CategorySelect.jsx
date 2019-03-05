import React from "react";
import { NativeSelect } from "@material-ui/core";

class CategorySelect extends React.Component {
  state = {
    categoriest: []
  };

  componentDidMount() {
    fetch(`http://localhost:6543/api/categories`, {
      method: "GET",
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
      .then(response => {
        this.setState({ categoriest: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <NativeSelect
        name="category"
        value={this.props.currentCategory}
        input={this.props.input}
      >
        <option value="" />
        {this.state.categoriest.map(option => (
          <option key={option.name} value={option.id}>
            {option.name}
          </option>
        ))}
      </NativeSelect>
    );
  }
}

export default CategorySelect;
