import React from "react";
import HomePage from "./containers/HomePage";
import RestautantListPage from "./containers/RestaurantListPage";
import MyRestaurantsPage from './containers/MyRestaurantsPage';
import RestaurantsMapPage from "./containers/RestaurantsMapPage";
import RestaurantPage from "./containers/RastaurantPage";
import { Route, Switch } from "react-router-dom";
import LogInPage from "./containers/LogInPage";
import SignUpPage from "./containers/SignUpPage";

class Router extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/restaurants" exact component={RestautantListPage} />
          <Route path="/restaurants-map" exact component={RestaurantsMapPage} />
          <Route path="/restaurants/:id" exact component={RestaurantPage} />
          <Route path="/log-in" component={LogInPage} />
          <Route path="/sign-up" component={SignUpPage} />
          {/*<Route path="*" component={RestaurantPage}/>*/}
           <Route path="/profile/my-restaurants" component={MyRestaurantsPage} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default Router;
