import React from "react";
import { Route, Redirect } from "react-router-dom";
import AppContext from "../components/AppContext";
import GeneralError from "../components/ErrorPages/GeneralError";

const PrivateRoute = ({ component: Component, access, ...rest }) => {
  return (
    <AppContext.Consumer>
      {state => (
        <Route
          {...rest}
          render={props => {
            const role = localStorage.getItem("role");
            return localStorage.getItem("token") ? (
              access.includes(role) ? (
                <Component {...props} />
              ) : (
                <GeneralError />
              )
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
};

export default PrivateRoute;
