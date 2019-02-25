import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import GenericTabs from "../Service/GenericTabs";
import PageContainer from "./PageContainer";
import WaiterPanelOrders from "./WaiterPanelOrders"
import {AddAllCategory, GetCurrentRouteLocation} from "../Service/functions"


class WaiterPanel extends React.Component  {

	componentDidMount() {
		const { history, match } = this.props;
		/*TODO: in future, when in Waiter panel the
		additional functionality will be present - add Tabs or List and remove this*/
		history.push(`${match.url}/orders`);
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
