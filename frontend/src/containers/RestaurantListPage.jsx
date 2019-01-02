import React from "react";
import TagsTab from '../components/RestaurantList/TagsTab';
import "../components/RestaurantList/style.css";

const RestautantListPage = (props) => {
  return (
      <div className="container-main">
          {/*<SearchRestaurant />*/}
          <TagsTab url={props} />
      </div>
  )
};

export default RestautantListPage;
