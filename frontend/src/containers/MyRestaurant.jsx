import React, { Component } from "react";
import RestaurantList from "../components/RestaurantList";
import AddRestaurant from "../components/Profile/AddRestaurant";

class MyRestaurant extends Component {
  state = {
    owner: "Jason Brown",
    myRestaurants: [],
  };

  componentDidMount() {
    fetch(`http://localhost:6543/my_restaurant?owner=${this.state.owner}`)
      .then(response => response.json())
      .then(data => this.setState({ myRestaurants: data.data }));
  }

  render() {
    const { owner, myRestaurants } = this.state;
    return (
      <div>
        <RestaurantList data={myRestaurants} />
        <AddRestaurant />
      </div>
    );
  }
}

export default MyRestaurant;
