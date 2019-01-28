import React, { Component } from "react";
import RestaurantInfo from "../components/RestaurantDetails/RestaurantInfo";
import PageContainer from "./PageContainer";
import CollapseForm from "../components/CollapseForm";
import UpdateRestaurantForm from "../components/UserRestaurants/UpdateRestaurantForm";

export class RastaurantPage extends Component {
  state = {
    restInfo: []
  };

  componentDidMount() {
    const restId = this.props.match.params.id;
    fetch(`http://localhost:6543/api/restaurant/${restId}`)
      .then(response => response.json())
      .then(rest => this.setState({ restInfo: rest.data[0] }));
  }

  handleUpdateRestaurant = updatedRestaurant => {
    this.setState({ restInfo: updatedRestaurant });
  };

  render() {
    return (
      <PageContainer>
        <RestaurantInfo restInfo={this.state.restInfo} />
        <CollapseForm>
          <UpdateRestaurantForm
            restId={this.props.match.params.id}
            onUpdate={this.handleUpdateRestaurant}
          />
        </CollapseForm>
      </PageContainer>
    );
  }
}

export default RastaurantPage;
