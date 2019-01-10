import React from "react";
import PageContainer from "../containers/PageContainer";
import { BrowserRouter } from "react-router-dom";
import Router from "../router";
import AppContext from "../components/AppContext"


class App extends React.Component {
  state = {
    auth: false,
    role: "",
    token: ""
  }

  changeState = (obj) => {
    this.setState({auth: true})
    console.log(obj)
    console.log("sda", this.state)
  }


  render() {
    return (
      <AppContext.Provider value={{state: this.state, changeState: this.changeState}}>   
        <BrowserRouter>
          <PageContainer>
            <Router />
          </PageContainer>
        </BrowserRouter>
      </AppContext.Provider> 
    );
  };
};

export default App;
