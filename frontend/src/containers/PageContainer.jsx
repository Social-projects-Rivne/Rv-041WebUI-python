import React from "react";
import AppHeader from "../components/AppHeader";

const PageContainer = props => {
  React.Children.forEach(props.children, child => {
    console.log(child);
  });
  state = {
        auth: false,
        isOwner: false,
        anchorEl: null
      };

  return (
    <main>
      <AppHeader state={state}/>
      {props.children}
    </main>
  );
};

export default PageContainer;
