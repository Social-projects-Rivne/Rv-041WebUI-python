import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "../router";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppContext from "../components/AppContext";
import AppHeader from "../components/AppHeader";
import { hot } from "react-hot-loader";

class App extends React.Component {
  state = {
    auth: false,
    role: "",
    token: ""
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      this.setState({ auth: true, token: token, role: role });
    }
  }

  changeState = obj => {
    this.setState(obj);
  };

  render() {
    return (
      <AppContext.Provider
        value={{ ...this.state, changeState: this.changeState }}
      >
        <CssBaseline />
        <BrowserRouter>
          <React.Fragment>
            <AppHeader />
            <Router />
          </React.Fragment>
        </BrowserRouter>
      </AppContext.Provider>
    );
  }
}

export default hot(module)(App);
