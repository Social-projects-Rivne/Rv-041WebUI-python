import React from 'react';
import { Route, Switch } from "react-router-dom";
import RestaurantsListPage from '../restaurantsListPage';
class Router extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={RestaurantsListPage} />
                </Switch>
            </div>

        )
    };
};
export default Router
