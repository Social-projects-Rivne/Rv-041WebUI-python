import React from "react";
import { Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import GenericTabs from "../Service/GenericTabs";
import PageContainer from "./PageContainer";
import Orders from "../components/WaiterPanelComponents/Orders"
import {AddAllCategory, GetCurrentRouteLocation} from "../Service/functions"

const styles = theme => ({
});


class WaiterPanelOrders extends React.Component {
    state = {
    	isLoading: true,
      error: "",
			token: localStorage.getItem("token"),
			statuses: [],
			orders: [],
			selectedTab: 0
			};
  
	componentDidMount() {

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

	changeOrderStatus = (orderId, new_status, booked_time) => {
    fetch("http://localhost:6543/api/order/" + orderId + "/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      },
			body: JSON.stringify({
        new_status: new_status,
        booked_time: Math.round(booked_time / 1000)
      })
    })
      .then(response =>
        [404, 403, 400].includes(response.status)
          ? response.json().then(Promise.reject())
          : response.json()
      )
      .then(json => {
        this.setState(prevState => {
					return{
						orders: prevState.orders.map(orderInfo => {
							if (orderInfo.id === orderId) {
								orderInfo.status = new_status;
								return orderInfo;
							} else {
								return orderInfo;
							}
						})
					}
        });
      })
      .catch(error => {
        this.setState({
          error: error
        });
      });
  };

  handleTabChange = (event, value) => {
    this.setState({ selectedTab: value })
  };

	render() {
    const { classes, match } = this.props;
    const { isLoading, statuses, orders, selectedTab } = this.state;

    if (isLoading) {
      return null;
		}

    //create object with arrays for each status orders data
    let statusesObject = {};
    let statusesLenthObject = {};

    for (let i = 0; i < statuses.length; i++) {
      const status = statuses[i];
      statusesObject[status] = orders.filter(order => {
        if (status === "") {
          return true;
        }
        else {
          return (order.status === status);
        }
      });
      //also count array length for each status
      statusesLenthObject[status] = statusesObject[status].length;
    }

		return (

      <PageContainer>
				<GenericTabs
					tags={statuses}
					tagsAdditionalInformation={statusesLenthObject}
					selectedValue={selectedTab}
					useRouter={true}
					fixedPath={match.url}
					handleTabChange={this.handleTabChange}
				/>

				<Switch>
					{statuses.map((status, index) => {
						return (
							<Route
								path={((match.url.trim()).substr(-1) === "/" ? match.url : match.url + "/") + status}
								key={index}
								exact={true}
								render={() => <Orders
									orders={statusesObject[status]}
									changeOrderStatus={this.changeOrderStatus}
								/>}
							/>
						);
					})}
				</Switch>
      </PageContainer>
		)
	}
}


export default withStyles(styles)(WaiterPanelOrders);
