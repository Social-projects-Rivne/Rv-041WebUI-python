import React from "react";
import AppHeader from "../components/AppHeader";

const PageContainer = props => {
  return (
    <React.Fragment>
      <AppHeader />
      {props.children}
    </React.Fragment>
  );
};

export default PageContainer;
