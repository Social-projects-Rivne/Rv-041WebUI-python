import React from "react";
import PageContainer from "../containers/PageContainer";
import { BrowserRouter } from "react-router-dom";
import Router from "../router";

const App = () => {
  return (
    <BrowserRouter>
      <PageContainer>
        <Router />
      </PageContainer>
    </BrowserRouter>
  );
};

export default App;
