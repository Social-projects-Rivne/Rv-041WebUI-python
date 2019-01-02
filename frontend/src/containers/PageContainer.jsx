import React from "react";
import AppHeader from "../components/AppHeader";

const PageContainer = props => {
  return (
    <main>
      <AppHeader />
      {props.children}
    </main>
  );
};

export default PageContainer;
