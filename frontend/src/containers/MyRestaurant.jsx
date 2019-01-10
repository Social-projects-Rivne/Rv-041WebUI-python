import React, { Component } from "react";
import RestaurantList from "../components/RestaurantList";
import AddUpdateRestaurant from "../components/Profile/AddUpdateRestaurant";

class MyRestaurant extends Component {
  state = {
    owner: "Jason Brown",
    myRestaurants: [],
  };

  componentDidMount() {
    fetch(`http://localhost:6543/my_restaurant?owner=${this.state.owner}`)
      .then(response => response.json())
      .then(rests => this.setState({ myRestaurants: rests.data }));
  }

  handleUpdate = restObj => {
    // console.log(restObj);
    this.setState({ myRestaurants: this.state.myRestaurants.concat(restObj) });
  };

  render() {
    const { owner, myRestaurants } = this.state;
    return (
      <div>
        <RestaurantList data={myRestaurants} />
        <AddUpdateRestaurant requestType="post" onUpdate={this.handleUpdate} />
      </div>
    );
  }
}

export default MyRestaurant;
