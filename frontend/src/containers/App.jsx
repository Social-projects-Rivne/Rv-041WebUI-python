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
import { lightBlue } from "@material-ui/core/colors/";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: lightBlue[900]
    },
    secondary: {
      main: lightBlue[200]
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
    if (token) {
      fetch("http://localhost:6543/api/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        }
      })
        .then(response => {
          if ([404, 403].includes(response.status)) {
            Promise.reject();
          } else {
            return response.json();
          }
        })
        .then(json => {
          this.setState({
            auth: true,
            role: json.data.role,
            userName: json.data.userName,
            token: json.data.token
          });
          localStorage.setItem("role", json.data.role);
          localStorage.setItem("userName", json.data.userName);
          localStorage.setItem("token", json.data.token);
        })
        .catch(error => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("userName");
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
