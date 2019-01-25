import React from "react";
import Routes from "../Routes";
import { BrowserRouter } from "react-router-dom";
import AppContext from "../components/AppContext";
import { hot } from "react-hot-loader";
import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider
} from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#ff0000"
    }
  }
});

class App extends React.Component {
  state = {
    auth: false,
    role: "",
    token: "",
    userName: ""
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userName = localStorage.getItem("userName");
    if (token && role && userName) {
      this.setState({
        auth: true,
        token: token,
        role: role,
        userName: userName
      });
    }
  }

  changeState = obj => {
    this.setState(obj);
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <AppContext.Provider
            value={{ ...this.state, changeState: this.changeState }}
          >
            <CssBaseline />
            <Routes />
          </AppContext.Provider>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default hot(module)(App);
