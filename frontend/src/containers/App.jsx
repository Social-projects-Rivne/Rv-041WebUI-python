import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "../router";
import PageContainer from "./PageContainer";

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
