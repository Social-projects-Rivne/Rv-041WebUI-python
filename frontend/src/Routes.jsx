import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage";
import RestautantListPage from "./containers/RestaurantListPage";
import RestaurantsMapPage from "./containers/RestaurantsMapPage";
import RestaurantPage from "./containers/RastaurantPage";
import MenuPage from "./containers/MenuPage";
import LogInPage from "./containers/LogInPage";
import SignUpPage from "./containers/SignUpPage";
import ModeratorPanel from "./containers/ModeratorPanel";
import ProfilePage from "./containers/ProfilePage";
import AppHeader from "./containers/AppHeader";
import RestaurantManagmentPage from "./containers/RestaurantManegmentPage/RestaurantManagmentPage";
import PrivateRoute from "./Service/PrivatRoute";
import WaiterPanel from "./containers/WaiterPanel";

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
    path: "/restaurants/:id",
    component: RestaurantPage
  },
  {
    path: "/restaurant/:restId/menu/:menuId",
    component: MenuPage
  },
  {
    path: "/profile/restaurants/:id",
    component: RestaurantPage,
    exact: true
  },
  {
    path: "/profile/restaurants/:id/edit",
    component: RestaurantManagmentPage,
    access: ["Client", "Owner"]
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
    component: ProfilePage,
    access: ["Client", "Owner"]
  },
  {
    path: "/moderator",
    component: ModeratorPanel,
    access: ["Moderator"]
  },
  {
    path: "/waiter",
    component: WaiterPanel,
    access: ["Waiter"]
  }
];

class Routes extends React.Component {
  render() {
    return (
      <>
        <Route component={AppHeader} />
        <Switch>
          {routes.map(({ path, component, exact, access }) =>
            !access ? (
              <Route
                exact={exact}
                key={component}
                path={path}
                component={component}
                access={access}
              />
            ) : (
              <PrivateRoute
                exact={exact}
                key={component}
                path={path}
                component={component}
                access={access}
              />
            )
          )}
        </Switch>
      </>
    );
  }
}
export default Routes;
