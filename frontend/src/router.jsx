import React from "react";
import HomePage from "./containers/HomePage";
import RestautantListPage from "./containers/RestaurantListPage";
import MyRestaurantsPage from "./containers/MyRestaurantsPage";
import RestaurantsMapPage from "./containers/RestaurantsMapPage";
import RestaurantPage from "./containers/RastaurantPage";
import MenuPage from "./containers/MenuPage";
import { Route, Switch } from "react-router-dom";
import LogInPage from "./containers/LogInPage";
import SignUpPage from "./containers/SignUpPage";
import Profile from "./containers/Profile";
import UserInfoPage from "./containers/UserInfo";

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
    path: "/restaurants/:restId/menu/:menuId",
    component: MenuPage
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
    component: Profile
  },
  {
    path: "/profile/persona_info",
    component: UserInfoPage
  },
  {
    path: "/profile/current_orders",
    component: Profile
  },
  {
    path: "/profile/my-restaurants",
    component: MyRestaurantsPage
  }
];

class Router extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          {routes.map(({ path, component }) => (
            <Route exact key={component} path={path} component={component} />
          ))}
        </Switch>
      </React.Fragment>
    );
  }
}
export default Router;
