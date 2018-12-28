import React from "react";
import { Route, Switch } from "react-router-dom";
class Router extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Test} />
        </Switch>
      </div>
    );
  }
}
export default Router;
