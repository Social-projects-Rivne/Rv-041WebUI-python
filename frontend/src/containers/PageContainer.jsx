import React from "react";
import AppHeader from "../components/AppHeader.jsx";

const AppFooter = () => <div>AppFooter</div>;

const PageContainer = props => {
  return (
    <div>
      <AppHeader />
      {props.children}
      <AppFooter />
    </div>
  );
};

export default PageContainer;
