import React from "react";
import { withStyles } from '@material-ui/core/styles';
import GenericTabs from "../Service/GenericTabs";
import UserOrders from "../components/UserOrders/UserOrders" 


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
    expanded: null,
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

  handleChange = panel => (event, expanded) => {
    console.log(expanded);
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded, isLoading, statuses, orders } = this.state;

    if (isLoading) {
      return null;
    }

    return (
      <div className={classes.root}>
        <GenericTabs
          tags={statuses}
          tagsAdditionalInformation={{}}
          selectedValue={1}
          /*handleTabChange={this.handleTabChange}*/
        />
        <UserOrders
          orders={orders} 
          expanded={expanded} 
          handleChange={this.handleChange}
        />
      </div>
    );
  }

}

export default withStyles(styles)(OrderListPage);
