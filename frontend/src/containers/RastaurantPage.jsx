import React, { Component } from "react";
import RestaurantInfo from "../components/RestaurantDetails/RestaurantInfo";
import AddUpdateRestaurant from "../components/Profile/AddUpdateRestaurant";

export class RastaurantPage extends Component {
  state = {
    restInfo: []
  };

  componentDidMount() {
    const restId = this.props.match.params.id;
    fetch(`http://localhost:6543/api/restaurant/${restId}`)
      .then(response => response.json())
      .then(rest => this.setState({ restInfo: rest.data[0] }));
  }

  handleUpdateRestaurant = restObj => {
    this.setState({ restInfo: restObj });
  };

  render() {
    return (
      <>
        <RestaurantInfo restInfo={this.state.restInfo} />
        <AddUpdateRestaurant
          requestType="put"
          onUpdate={this.handleUpdateRestaurant}
          id={this.props.match.params.id}
        />
      </>
    );
  }
}

export default RastaurantPage;
