import React from "react";

import { Paper } from "@material-ui/core";

import { convertFromRaw } from "draft-js";
import Converter from "../../components/Markdown/Converter";
import RestaurantInfo from "../../components/RestaurantManagment/Info/RestaurantInfo";

class ManageInfo extends React.Component {
  state = {
    restInfo: []
  };

  componentDidMount() {
    const restId = this.props.restId;
    fetch(`http://localhost:6543/api/restaurant/${restId}`, {
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
      .then(rest => {
        if (rest.data[0].description_markup) {
          const markup = Converter(
            convertFromRaw(JSON.parse(rest.data[0].description_markup))
          );
          rest.data[0].description_markup = markup;
        }
        this.setState({
          restInfo: rest.data[0]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { restInfo } = this.state;
    return (
      <Paper>
        <RestaurantInfo info={restInfo} />
      </Paper>
    );
  }
}

export default ManageInfo;
