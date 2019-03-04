import React from "react";
import { Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
	Snackbar,
	Typography
} from "@material-ui/core";
import SnackbarContent from "../components/SnackbarContent";
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
			selectedTab: 0,
			snackbarOpen: false,
			snackbarMsg: "",
			success: true,
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
					success: false,
					isLoading: false,
					snackbarOpen: true,
					snackbarMsg: "fail to connect server",
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
        !(response.status >= 200 && response.status < 300)
          ? response.json().then(Promise.reject())
          : response.json()
      )
      .then(json => {
        this.setState(prevState => {
					return{
						success: json.success,
						orders: prevState.orders.map(orderInfo => {
							if (orderInfo.id === orderId) {
								orderInfo.status = new_status;
								return orderInfo;
							} else {
								return orderInfo;
							}
						}),
						snackbarOpen: true,
						snackbarMsg: json.success ? "success" : "failure",
					}
        });
      })
      .catch(error => {
        this.setState({
					success: false,
					error: "" + error,
					snackbarOpen: true,
					snackbarMsg: "failed to make operation",
        });
      });
	};
	
	handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  handleTabChange = (event, value) => {
    this.setState({ selectedTab: value })
  };

	render() {
    const { match } = this.props;
		const { 
			isLoading, 
			statuses, 
			orders, 
			selectedTab,
			snackbarOpen,
			snackbarMsg,
			success
		} = this.state;

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
				<Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            open={snackbarOpen}
            autoHideDuration={success ? 3000 : 15000}
            onClose={this.handleSnackbarClose}
          >
            <SnackbarContent
              onClose={this.handleSnackbarClose}
              variant={success ? "success" : "error"}
              message={
                <Typography color="inherit" align="center">
                  {snackbarMsg || success || "Something went wrong"}
                </Typography>
              }
            />
          </Snackbar>
      </PageContainer>
		)
	}
}


export default withStyles(styles)(WaiterPanelOrders);
