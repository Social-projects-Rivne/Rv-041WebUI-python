import React, { Component } from "react";
import RestaurantInfo from "../components/RestaurantDetails/RestaurantInfo";
import AddUpdateRestaurant from "../components/Profile/AddUpdateRestaurant";
import withRest from "../HOC/withRest";

// export class RastaurantPage extends Component {
//   state = {
//     restInfo: []
//   };

//   componentDidMount() {
//     const restId = this.props.match.params.id;
//     // this.props.get(restId);
//   }

//   handleUpdateRestaurant = restObj => {
//     this.setState({ restInfo: restObj });
//   };

//   render() {
//     return <>{/* <RestaurantInfo restInfo={this.state.restInfo} /> */}</>;
//   }
// }

// export default RastaurantPage;

function RastaurantPage({ response }) {
  return (
    <>
      <RestaurantInfo restInfo={response} />
      {/* <AddUpdateRestaurant
        requestType="put"
        onUpdate={this.handleUpdateRestaurant}
        id={this.props.match.params.id}
      />*/}
    </>
  );
}

export default withRest(RastaurantPage, `api/user_restaurant`);
