import React from "react";
import AppSlider from "../components/HomePage/AppSlider";
import TagsList from "../components/HomePage/TagsList";

const HomePage = props => {
  return (
    <div style={{ marginTop: -24 }}>
      <AppSlider />
      <TagsList />
    </div>
  );
};

export default withRest(HomePage)("tag");
