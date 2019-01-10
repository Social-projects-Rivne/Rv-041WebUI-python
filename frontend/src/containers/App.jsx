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

  componentDidMount() {
    // Func to check if user already loged in 
    // (if token and role in localStorage)
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) { this.setState({auth: true, token: token, role: role}) }  
  }

  changeState = (obj) => {
    // hook for change state from AppContext.Consumer
    this.setState(obj)
  }

  
  render() {
    return (
      // Provider used to share state obj and hook to change state (this.changeState)
      // between AppContext.Provider and AppContext.Consumer
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
