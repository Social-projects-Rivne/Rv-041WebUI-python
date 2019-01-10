import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "../router";
import PageContainer from "./PageContainer";
import { AppProvider } from "./AppProvider";

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <PageContainer>
          <Router />
        </PageContainer>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
