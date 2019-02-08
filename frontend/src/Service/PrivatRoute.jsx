import React from "react";
import { Route, Redirect } from "react-router-dom";
import AppContext from "../components/AppContext";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AppContext.Consumer>
    {state => (
      <Route
        {...rest}
        render={props => {
          return localStorage.getItem("role") === "Owner" ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/log-in",
                state: { from: props.location }
              }}
            />
          );
        }}
      />
    )}
  </AppContext.Consumer>
);

export default PrivateRoute;
