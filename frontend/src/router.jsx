import React from "react";
import HomePage from "./containers/HomePage";
import RestautantListPage from "./containers/RestaurantListPage";
import RestaurantsMapPage from "./containers/RestaurantsMapPage";
import { Route, Switch } from "react-router-dom";
import LogInPage from "./containers/LogInPage";
import SignUpPage from "./containers/SignUpPage";

class Router extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/restaurants-list" component={RestautantListPage} />
          <Route path="/restaurants-map" component={RestaurantsMapPage} />
          <Route path="/log-in" component={LogInPage} />
          <Route path="/sign-up" component={SignUpPage} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default Router;
