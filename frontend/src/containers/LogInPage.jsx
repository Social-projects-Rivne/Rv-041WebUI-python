import React from "react";
import Login from "../components/Login";
import AppContext from "../components/AppContext";
import PageContainer from "./PageContainer";

const LogInPage = props => {
  return (
    <PageContainer width="small">
      <AppContext.Consumer>
        {state => {
          if (state.auth) {
            props.history.push("/restaurants");
          } else {
            return <Login history={props.history} state={state} />;
          }
        }}
      </AppContext.Consumer>
    </PageContainer>
  );
};

export default LogInPage;
