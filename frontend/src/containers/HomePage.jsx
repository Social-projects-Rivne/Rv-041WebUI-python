import React from "react";
import AppSlider from "../components/HomePage/AppSlider";
import TagsList from "../components/HomePage/TagsList";
import PageContainer from "./PageContainer";

const HomePage = () => {
  return (
    <PageContainer fullWidth noPadding>
      <AppSlider />
      <TagsList />
    </PageContainer>
  );
};

export default HomePage;
