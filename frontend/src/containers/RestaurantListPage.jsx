import React from "react";
import TagsTab from "../components/RestaurantList/TagsTab";
import PageContainer from "./PageContainer";

const RestautantListPage = props => {
  return (
    <PageContainer>
      <TagsTab url={props} />
    </PageContainer>
  );
};

export default RestautantListPage;
