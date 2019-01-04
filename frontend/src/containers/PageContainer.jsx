import React from "react";
import AppHeader from "../components/AppHeader";

const PageContainer = props => {
  React.Children.forEach(props.children, child => {
    console.log(child);
  });
  return (
    <main>
      <AppHeader />
      {props.children}
    </main>
  );
};

export default PageContainer;
