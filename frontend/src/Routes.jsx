import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage";
import RestautantListPage from "./containers/RestaurantListPage";
import RestaurantsMapPage from "./containers/RestaurantsMapPage";
import RestaurantPage from "./containers/RastaurantPage";
// import MyRestaurant from "./containers/MyRestaurants";
import LogInPage from "./containers/LogInPage";
import SignUpPage from "./containers/SignUpPage";
import ProfilePage from "./containers/ProfilePage";
import AppHeader from "./containers/AppHeader";

const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true
  },
  {
    path: "/restaurants",
    component: RestautantListPage,
    exact: true
  },
  {
    path: "/restaurant/:id",
    component: RestaurantPage
  },
  {
    path: "/profile/my_restaurant/:id",
    component: RestaurantPage
  },
  {
    path: "/restaurants-map",
    component: RestaurantsMapPage
  },
  {
    path: "/log-in",
    component: LogInPage
  },
  {
    path: "/sign-up",
    component: SignUpPage
  },
  {
    path: "/profile",
    component: ProfilePage
  }
];

class Routes extends React.Component {
  render() {
    return (
      <>
        <Route component={AppHeader} />
        <Switch>
          {routes.map(({ path, component, exact }) => (
            <Route
              exact={exact}
              key={component}
              path={path}
              component={component}
            />
          ))}
        </Switch>
      </>
    );
  }
}
export default Routes;
