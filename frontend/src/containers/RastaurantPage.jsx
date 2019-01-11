import React, { Component } from "react";
import RestaurantInfo from "../components/RestaurantDetails/RestaurantInfo";

export class RastaurantPage extends Component {
  state = {
    restInfo: [],
  };

  componentDidMount() {
    const restId = this.props.match.params.id;
    fetch(`http://localhost:6543/restaurant/${restId}`)
      .then(response => response.json())
      .then(rest => this.setState({ restInfo: rest.data[0] }));
  }

  handleUpdateRestaurant = restObj => {
    this.setState({ restInfo: restObj });
  };

  render() {
    return (
      <div>
        <RestaurantInfo
          onUpdate={this.handleUpdateRestaurant}
          restInfo={this.state.restInfo}
        />
      </div>
    );
  }
}

export default RastaurantPage;
