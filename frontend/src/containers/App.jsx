import React from "react";
import Routes from "../Routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppContext from "../components/AppContext";
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
        <Routes />
      </AppContext.Provider>
    );
  }
}

export default hot(module)(App);
