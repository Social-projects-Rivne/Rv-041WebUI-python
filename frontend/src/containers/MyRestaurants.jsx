import React from "react";
import RestaurantList from "../components/RestaurantList/RestaurantList";
import AddUpdateRestaurant from "../components/UserRestaurants/AddUpdateRestaurant";

class MyRestaurants extends React.Component {
  state = {
    myRestaurants: []
  };

  componentDidMount() {
    fetch(`http://localhost:6543/api/user_restaurants`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(rests => this.setState({ myRestaurants: rests.data }));
  }

  handleAddRestaurant = restObj => {
    this.setState({ myRestaurants: this.state.myRestaurants.concat(restObj) });
  };

  render() {
    const { myRestaurants } = this.state;

    return (
      <>
        <RestaurantList data={myRestaurants} />
        <AddUpdateRestaurant
          id={null}
          requestType="post"
          onAdd={this.handleAddRestaurant}
        />
      </>
    );
  }
}

export default MyRestaurants;
