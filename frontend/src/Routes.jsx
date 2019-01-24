import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import HomePage from "./containers/HomePage";
import RestautantListPage from "./containers/RestaurantListPage";
import MyRestaurantsPage from "./containers/MyRestaurantsPage";
import RestaurantsMapPage from "./containers/RestaurantsMapPage";
import RestaurantPage from "./containers/RastaurantPage";
import LogInPage from "./containers/LogInPage";
import SignUpPage from "./containers/SignUpPage";
import ProfilePage from "./containers/ProfilePage";
import UserInfoPage from "./containers/UserInfo";
import AppHeader from "./containers/AppHeader";

const routes = [
  {
    path: "/",
    component: HomePage
  },
  {
    path: "/restaurants",
    component: RestautantListPage
  },
  {
    path: "/restaurants/:id",
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
  },
  {
    path: "/profile/persona_info",
    component: UserInfoPage
  },
  {
    path: "/profile/current_orders",
    component: ProfilePage
  },
  {
    path: "/profile/my_restaurants",
    component: MyRestaurantsPage
  }
];

class Routes extends React.Component {
  render() {
    return (
      <>
        <Route component={AppHeader} />
        <Switch>
          {routes.map(({ path, component }) => (
            <Route exact key={component} path={path} component={component} />
          ))}
        </Switch>
      </>
    );
  }
}
export default Routes;
