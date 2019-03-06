import React from "react";
import RestaurantList from "../components/RestaurantList/RestaurantList";
import CollapseForm from "../components/CollapseForm";
import AddRestaurantForm from "../components/UserRestaurants/AddRestaurantForm";
import { Typography } from "@material-ui/core";
import AppContext from "../components/AppContext";

export const ArchiveContext = React.createContext();

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
        this.setState({ myRestaurants: rests.data });
      })
      .catch(err => console.log(err));
  }

  handleAddRestaurant = newRestaurant => {
    this.setState({
      myRestaurants: [...this.state.myRestaurants, ...newRestaurant]
    });
  };

  handleArchiveRestaurant = (restId, status) => {
    const myRestaurants = this.state.myRestaurants.map(item => {
      if (item.id == restId) {
        item.status = status;
        return item;
      } else {
        return item;
      }
    });
    this.setState({ myRestaurants });
  };

  render() {
    const { myRestaurants } = this.state;
    return (
      <AppContext.Consumer>
        {ctx => (
          <>
            {myRestaurants.length > 0 ? (
              <ArchiveContext.Provider
                value={{
                  handleArchiveRestaurant: this.handleArchiveRestaurant
                }}
              >
                <RestaurantList data={myRestaurants} />
              </ArchiveContext.Provider>
            ) : (
              <Typography variant="subtitle2">
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
