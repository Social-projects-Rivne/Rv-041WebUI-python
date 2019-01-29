import React from "react";
import RestaurantList from "../components/RestaurantList/RestaurantList";
import CollapseForm from "../components/CollapseForm";
import AddRestaurantForm from "../components/UserRestaurants/AddRestaurantForm";

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

  handleAddRestaurant = newRestaurant => {
    this.setState({
      myRestaurants: [...this.state.myRestaurants, ...newRestaurant]
    });
  };

  render() {
    const { myRestaurants } = this.state;
    return (
      <>
        <RestaurantList data={myRestaurants} />
        <CollapseForm
          tooltipText="Add restaurant"
          formTitle="Create new restaurant:"
        >
          <AddRestaurantForm onAdd={this.handleAddRestaurant} />
        </CollapseForm>
      </>
    );
  }
}

export default MyRestaurants;
