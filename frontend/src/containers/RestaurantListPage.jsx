import React from "react";
import TagsTab from '../components/RestaurantList/TagsTab';

const RestautantListPage = (props) => {
  return (
      <React.Fragment>
          <TagsTab url={props} />
      </React.Fragment>
  )
};

export default RestautantListPage;
