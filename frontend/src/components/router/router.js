import React from 'react';
import { Route, Switch } from "react-router-dom";
import Test from '../test';
class Router extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={Test} />
                    <Route path="/test" component={Test} />
                </Switch>
            </div>

        )
    };
};
export default Router
