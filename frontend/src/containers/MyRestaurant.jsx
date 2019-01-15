import React, { Component } from "react";
import RestaurantList from "../components/RestaurantList";
import AddUpdateRestaurant from "../components/Profile/AddUpdateRestaurant";

class MyRestaurant extends Component {
  state = {
    myRestaurants: [],
  };

  componentDidMount() {
    fetch(`http://localhost:6543/user_restaurants`)
      .then(response => response.json())
      .then(rests => this.setState({ myRestaurants: rests.data }));
  }

  handleAddRestaurant = restObj => {
    this.setState({ myRestaurants: this.state.myRestaurants.concat(restObj) });
  };

  render() {
    const { owner, myRestaurants } = this.state;
    return (
      <div>
        <RestaurantList data={myRestaurants} />
        <AddUpdateRestaurant
          id={null}
          requestType="post"
          onAdd={this.handleAddRestaurant}
        />
      </div>
    );
  }
}

export default MyRestaurant;
