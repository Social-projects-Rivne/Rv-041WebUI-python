import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import OrderItemsList from "../MenuPage/OrderItemsList";
import {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanel,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SnackbarContent from "../SnackbarContent";
import PageContainer from "../../containers/PageContainer";
import ExpandItem from "./ExpandItem";
import WaitersRadio from "./WaitersRadio";

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
    console.log(this.state.orders[orderIndex], orderIndex);
    this.state.orders[orderIndex].status = newStatus;
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ isSnackbarOpen: false });
  };

  render() {
    const { classes } = this.props;
    let value = 0;
    return (
      <PageContainer>
        <AppBar position="static">
          <Tabs value={value} variant="scrollable" scrollButtons="on">
            <Tab label="Accepted" component={Link} to={{ search: "" }} />
              <Tab label="Assigned waiter" component={Link} to={{ search: "" }} />
          </Tabs>
        </AppBar>
        <TabContainer>
          <div style={{ padding: 8 }}>
            <Grid container spacing={16}>
              {this.state.orders.map((order, index) => {
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
        </TabContainer>
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
      </PageContainer>
    );
  }
}

AdministratorPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdministratorPanel);
