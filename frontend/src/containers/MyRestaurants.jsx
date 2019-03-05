import React from "react";
import RestaurantList from "../components/RestaurantList/RestaurantList";
import CollapseForm from "../components/CollapseForm";
import AddRestaurantForm from "../components/UserRestaurants/AddRestaurantForm";
import { Typography } from "@material-ui/core";
import AppContext from "../components/AppContext";

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
        console.log(rests.data);
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
      <AppContext.Consumer>
        {ctx => (
          <>
            {myRestaurants.length > 0 ? (
              <RestaurantList data={myRestaurants} />
            ) : (
              <Typography variant="h6">
                Create your first restaurant:
              </Typography>
            )}
            <CollapseForm
              tooltipText="Add restaurant"
              formTitle="Create new restaurant:"
            >
              <AddRestaurantForm ctx={ctx} onAdd={this.handleAddRestaurant} />
            </CollapseForm>
          </>
        )}
      </AppContext.Consumer>
    );
  }
}

export default MyRestaurants;
