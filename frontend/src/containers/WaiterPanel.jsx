import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {AddAllCategory, GetCurrentRouteLocation} from "../Service/functions"

const styles = theme => ({
});


class WaiterPanel extends React.Component {
    state = {
    	isLoading: true,
      error: "",
			token: localStorage.getItem("token"),
			statuses: [],
			orders: [],
			selectedTab: 0
			};
  
	componentDidMount() {

		console.log("thtrhhthrthtrh");

		let currentRouteLocation = GetCurrentRouteLocation(this.props.location.pathname, this.props.match.url);

		const headers = new Headers({
			"Content-Type": "application/json",
			"X-Auth-Token": this.state.token
		});

		const fetchInit = {
			method: "GET",
			headers: headers
		};

		fetch("http://localhost:6543/api/waiter/orders", fetchInit)
			.then(response =>
				!(response.status >= 200 && response.status < 300)
					? Promise.reject.bind(Promise)
					: response.json()
			)
			.then(data =>
				this.setState({
					isLoading: false,
					statuses: AddAllCategory(data.data.statuses),
					selectedTab: AddAllCategory(data.data.statuses).indexOf(currentRouteLocation),
					orders: data.data.orders_data,
					success: data.success,
					error: data.error
				})
			)
			.catch(err =>
				this.setState({
					isLoading: false,
					error: "" + err
				})
			);
	}


	render() {
    const { classes, match } = this.props;
    const { isLoading, statuses, orders, selectedTab } = this.state;

		console.log(orders, statuses)

    if (isLoading) {
      return null;
		}

		return (
			<p>Something</p>
		)
		
	}



}


export default withStyles(styles)(WaiterPanel);
