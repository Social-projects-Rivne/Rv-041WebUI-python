import React from "react";
import { Switch, Route } from "react-router-dom";
import Menus from "./Menus";
import CreateMenu from "../../components/RestaurantManagment/CreateMenu";

const ManageMenu = props => {
  return (
    <Switch>
      <Route
        path={`${props.match.url}/:id`}
        render={currentProps => (
          <Menus restId={props.restId} {...currentProps} />
        )}
      />
      <Route path={`${props.match.url}/create`} component={CreateMenu} />
    </Switch>
  );
};

export default ManageMenu;
