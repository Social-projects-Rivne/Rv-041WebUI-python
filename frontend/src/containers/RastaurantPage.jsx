import React, { Component } from "react";
import RestaurantInfo from "../components/RestaurantDetails/RestaurantInfo";
import PageContainer from "./PageContainer";
import AppContext from "../components/AppContext";
import converter from "../components/Markdown/Converter";
import { convertFromRaw } from "draft-js";

export class RastaurantPage extends Component {
  state = {
    restInfo: [],
    restMarkup: "",
    ableUpdate: false
  };

  componentDidMount() {
    const restId = this.props.match.params.id;
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
          const markup = converter(
            convertFromRaw(JSON.parse(rest.data[0].description_markup))
          );
          this.setState({
            restMarkup: markup
          });
        }
        this.setState({
          restInfo: rest.data[0],
          ableUpdate: rest.is_owner
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleUpdateRestaurant = updatedRestaurant => {
    this.setState({ restInfo: updatedRestaurant });
  };

  render() {
    const { restInfo, restMarkup, ableUpdate } = this.state;
    return (
      <AppContext.Consumer>
        {state => (
          <PageContainer>
            <RestaurantInfo
              restInfo={restInfo}
              auth={state.auth}
              ableUpdate={ableUpdate}
              markup={restMarkup}
            />
          </PageContainer>
        )}
      </AppContext.Consumer>
    );
  }
}

export default RastaurantPage;
