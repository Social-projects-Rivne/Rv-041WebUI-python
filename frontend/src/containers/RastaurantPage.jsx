import React, { Component } from "react";
import RestaurantInfo from "../components/RestaurantDetails/RestaurantInfo";
import PageContainer from "./PageContainer";
import CollapseForm from "../components/CollapseForm";
import UpdateRestaurantForm from "../components/UserRestaurants/UpdateRestaurantForm";
import Edit from "@material-ui/icons/Edit";
import AppContext from "../components/AppContext";

export class RastaurantPage extends Component {
  state = {
    restInfo: [],
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
    const { restInfo, ableUpdate } = this.state;
    return (
      <AppContext.Consumer>
        {state => (
          <PageContainer>
            <RestaurantInfo
              restInfo={restInfo}
              auth={state.auth}
              ableUpdate={ableUpdate}
            />
          </PageContainer>
        )}
      </AppContext.Consumer>
    );
  }
}

export default RastaurantPage;
