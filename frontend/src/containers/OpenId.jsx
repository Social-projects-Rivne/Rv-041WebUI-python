import React from "react";
import OpenId from "../components/OpenId";
import AppContext from "../components/AppContext";
import PageContainer from "./PageContainer";

const openId = props => {
  return (
    <PageContainer fullHeight width="small">
      <AppContext.Consumer>
        {state => {
          return (
            <OpenId
              location={props.location}
              history={props.history}
              state={state}
            />
          );
        }}
      </AppContext.Consumer>
    </PageContainer>
  );
};

export default openId;
