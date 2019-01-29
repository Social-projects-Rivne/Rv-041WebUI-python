import React from "react";
import RestaurantList from "../components/RestaurantList/RestaurantList";
import CollapseForm from "../components/CollapseForm";
import AddRestaurantForm from "../components/UserRestaurants/AddRestaurantForm";
import { Typography } from "@material-ui/core";

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
      .then(rests => {
        console.log(rests);
        this.setState({ myRestaurants: rests.data });
      });
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
        {myRestaurants.length > 0 ? (
          <RestaurantList data={myRestaurants} />
        ) : (
          <Typography variant="h6">Create your first restaurant:</Typography>
        )}
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
