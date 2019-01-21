import React, { Component } from "react";
import RestaurantList from "../components/RestaurantList";
import AddUpdateRestaurant from "../components/Profile/AddUpdateRestaurant";
import withRest from "../HOC/withRest";

// class MyRestaurant extends Component {
//   state = {
//     myRestaurants: []
//   };

//   componentDidMount() {
//     fetch(`http://localhost:6543/api/user_restaurants`, {
//       headers: {
//         "Content-Type": "application/json",
//         "x-auth-token": localStorage.getItem("token")
//       }
//     })
//       .then(response => response.json())
//       .then(rests => this.setState({ myRestaurants: rests.data }));
//   }

//   handleAddRestaurant = restObj => {
//     this.setState({ myRestaurants: this.state.myRestaurants.concat(restObj) });
//   };

//   render() {
//     const { owner, myRestaurants } = this.state;
//     return (
// <div>
//   <RestaurantList data={myRestaurants} />
//   <AddUpdateRestaurant
//     id={null}
//     requestType="post"
//     onAdd={this.handleAddRestaurant}
//   />
// </div>
//     );
//   }
// }

// export default MyRestaurant;

function MyRestaurant({ response, create }) {
  return (
    <>
      <RestaurantList response={response} />
      <AddUpdateRestaurant onAdd={create} />
    </>
  );
}

export default withRest(MyRestaurant, `api/user_restaurants`);
