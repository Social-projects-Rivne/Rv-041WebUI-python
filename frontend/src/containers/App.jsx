import React from "react";
import PageContainer from "../containers/PageContainer";

import Router from "../router";

const App = props => {
  return (
    <PageContainer>
      <Router />
    </PageContainer>
  );
};

export default App;
