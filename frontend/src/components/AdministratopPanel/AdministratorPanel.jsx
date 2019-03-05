import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  Snackbar
} from "@material-ui/core";
import SnackbarContent from "../SnackbarContent";
import PageContainer from "../../containers/PageContainer";
import ExpandItem from "./ExpandItem";
import WaitersTab from './WaitersTab';

function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = {
  root: {
    flexGrow: 1
  },
  item: {
    marginTop: 16
  }
};

class AdministratorPanel extends React.Component {
  state = {
    orders: [],
    waiters: [],
    selectedTab: 0,
    SnackbarType: "",
    SnackbarMsg: "",
    isSnackbarOpen: false
  };

  componentDidMount() {
    this.getOrders();
    this.getWaiters();
  }

  getOrders = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem("token")
    });
    const fetchInit = {
      method: "GET",
      headers: headers
    };
    fetch("http://localhost:6543/api/orders", fetchInit)
      .then(response => response.json())
      .then(data => {
        this.setState({ orders: data.data });
      })
      .catch(err => console.log(err));
  };

  getWaiters = () => {
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem("token")
    });
    const fetchInit = {
      method: "GET",
      headers: headers
    };
    fetch("http://localhost:6543/api/waiters", fetchInit)
      .then(response => response.json())
      .then(data => {
        this.setState({ waiters: data.data });
      })
      .catch(err => console.log(err));
  };

  handleSnackbar = (msg, type) => {
    this.setState({
      SnackbarMsg: msg,
      isSnackbarOpen: true,
      SnackbarType: type
    });
  };

  changeStatus = (orderIndex, newStatus) => {
    this.state.orders[orderIndex].status = newStatus;
    this.getOrders();
  };

  handleTabChange = (event, value) => {
    if (value === 4) {
      this.getWaiters();
      this.getOrders();
    } else {
      this.setState({
        selectedTab: value
      })
    }
    
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ isSnackbarOpen: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={this.state.selectedTab} onChange={this.handleTabChange} variant="scrollable" scrollButtons="on">
            <Tab label="Waiting for confirm" />
            <Tab label="Accepted" />
            <Tab label="Assigned waiter" />
            <Tab label="Waiters" />
          </Tabs>
        </AppBar>
          {this.state.selectedTab === 0 && (
              <TabContainer>
                  <div style={{ padding: 8 }}>
                      <Grid container spacing={16}>
                          {this.state.orders.map((order, index) => {
                              if (order.status != "Waiting for confirm") {
                                  return null
                              }
                              return (
                                  <ExpandItem
                                      key={"i" + index}
                                      order={order}
                                      index={index}
                                      handleSnackbar={this.handleSnackbar}
                                      changeStatus={this.changeStatus}
                                      waiters={this.state.waiters}
                                  />
                              );
                          })}
                      </Grid>
                  </div>
              </TabContainer>)}
          {this.state.selectedTab === 2 && (
              <TabContainer>
                  <div style={{ padding: 8 }}>
                      <Grid container spacing={16}>
                          {this.state.orders.map((order, index) => {
                              if (order.status != "Assigned waiter") {
                                  return null
                              }
                              return (
                                  <ExpandItem
                                      key={"i" + index}
                                      order={order}
                                      index={index}
                                      handleSnackbar={this.handleSnackbar}
                                      changeStatus={this.changeStatus}
                                      waiters={this.state.waiters}
                                  />
                              );
                          })}
                      </Grid>
                  </div>
              </TabContainer>)}
        {this.state.selectedTab === 1 && (
          <TabContainer>
            <div style={{ padding: 8 }}>
              <Grid container spacing={16}>
                {this.state.orders.map((order, index) => {
                  if (order.status != "Accepted") {
                    return null
                  }
                  return (
                    <ExpandItem
                      key={"i" + index}
                      order={order}
                      index={index}
                      handleSnackbar={this.handleSnackbar}
                      changeStatus={this.changeStatus}
                      waiters={this.state.waiters}
                    />
                  );
                })}
              </Grid>
            </div>
          </TabContainer>)}
        {this.state.selectedTab === 3 && (
          <WaitersTab />
        )}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={this.state.isSnackbarOpen}
          autoHideDuration={4000}
          onClose={this.handleSnackbarClose}
        >
          <SnackbarContent
            onClose={this.handleSnackbarClose}
            variant={this.state.SnackbarType}
            message={
              <Typography color="inherit" align="center">
                {this.state.SnackbarMsg || "Something went wrong..."}
              </Typography>
            }
          />
        </Snackbar>
      </div>
    );
  }
}

AdministratorPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdministratorPanel);
