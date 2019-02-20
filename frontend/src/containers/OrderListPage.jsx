import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import GenericTabs from "../Service/GenericTabs";
import UserOrders from "../components/UserOrders/UserOrders"; 


const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  image: {
    height: 100,
    width: 133.5,
    backgroundSize: "contain",
    /*paddingTop: "56.25%" // 16:9*/
  },
  avatar: {
    margin: 10,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  }
});

class OrderListPage extends React.Component {
  state = {
    token: localStorage.getItem("token"),
    isLoading: true,
    statuses: [],
    orders: [],
    selectedTab: 0
  };

  componentDidMount() {

    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": this.state.token
    });
    const route = "http://localhost:6543/api/profile/orders/" + this.props.status;
    const fetchInit = {
      method: "GET",
      headers: headers
    };

    fetch(route, fetchInit)
      .then(response =>
        !(response.status >= 200 && response.status < 300)
          ? Promise.reject(response.status)
          : response.json()
      )
      .then(data =>
        this.setState({
          isLoading: false,
          statuses: data.data.statuses,
          orders: data.data.orders_data,
          success: data.success,
          error: data.error
        })
      )
      .catch(err => this.setState({ success: false, error: err.message, isLoading: false }));
  }

  handleTabChange = (event, value) => {
    this.setState({ selectedTab: value })
  };

  render() {
    const { classes, myRoute } = this.props;
    const { isLoading, statuses, orders, selectedTab } = this.state;
    //add default "All" status Tab to tab statuses array (to the beginning)
    if (statuses.indexOf("All") === -1){
      statuses.unshift("All");
    }

    //create object with arrays for each status orders data
    let statusesObject = {};
    let statusesLenthObject = {};

    for (let i = 0; i < statuses.length; i++) {
      const status = statuses[i];
      statusesObject[status] = orders.filter(order => {
        if (status === "All") {
          return true;
        }
        else {
          return (order.status === status);
        }
      });
      //also count array length for each status
      statusesLenthObject[status] = statusesObject[status].length;
    }

    if (isLoading) {
      return null;
    }

    return (
      <div className={classes.root}>
        <GenericTabs
          tags={statuses}
          tagsAdditionalInformation={statusesLenthObject}
          selectedValue={selectedTab}
          useRouter={true}
          fixedPath={myRoute}
          handleTabChange={this.handleTabChange}
        />
        <Switch>
          {statuses.map((status, index) => {
            return(
              <Route
                path={`${myRoute}/${status}`}
                key={index}
                render={() => <UserOrders orders={
                  statusesObject[status]  
                }/>}
              />
            );
          })}
        </Switch>
      </div>
    );
  }

}

export default withStyles(styles)(OrderListPage);
