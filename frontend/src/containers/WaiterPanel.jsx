import React from "react";
import { Route, Switch } from "react-router-dom";
import PageContainer from "./PageContainer";
import WaiterPanelOrders from "./WaiterPanelOrders"
import {GetCurrentRouteLocation} from "../Service/functions"


class WaiterPanel extends React.Component  {

	componentDidMount() {
		const { history, match, location } = this.props;
		/*TODO: in future, when in Waiter panel the
		additional functionality will be present - add Tabs or List and remove this*/
		const currentRouteLocation = GetCurrentRouteLocation(location.pathname, match.url);
		if (currentRouteLocation === "") {
			history.push(`${match.url}/orders`);
		}
	};

	render() {
		const { match } = this.props;
		return (
			<PageContainer>
				<Switch>
					return (
						<Route
							path={`${match.url}/orders`}
							exact={false}
							component={WaiterPanelOrders}
						/>
					);
				</Switch>
			</PageContainer>
		)
	}
}

export default WaiterPanel;
