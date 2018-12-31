import React from 'react';
import { Route, Switch } from "react-router-dom";
import RestaurantsListPage from '../restaurantsListPage';
import RestaurantDetails from '../restaurantDetails';
class Router extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/rest" exact component={RestaurantsListPage} />
                    <Route path="/test" exact component={RestaurantDetails} />
                    <Route path="/${id}" exact component={RestaurantDetails} />
                </Switch>
            </div>

        )
    };
};
export default Router
