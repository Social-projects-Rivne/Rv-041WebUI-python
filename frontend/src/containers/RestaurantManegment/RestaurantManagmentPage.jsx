import React from "react";
import PropTypes from "prop-types";
import PageContainer from "../PageContainer";
import ManageMenu from "./ManageMenu";
import ManageInfo from "./ManageInfo";
import ManageWaiters from "./ManageWaiters";
import DrawerMenu from "../../components/RestaurantManagment/DrawerMenu";
import CreateMenu from "../../components/RestaurantManagment/CreateMenu";
import { withStyles, Drawer } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: theme.zIndex.appBar - 1
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: theme.zIndex.appBar - 1
  },
  toolbar: { ...theme.mixins.toolbar }
});

export class RestaurantManagmentPage extends React.Component {
  state = {
    menusList: []
  };

  componentDidMount() {
    const restId = this.props.match.params.id;
    fetch(`http://localhost:6543/api/restaurant/${restId}/menu`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    })
      .then(response => {
        return response.status >= 200 && response.status < 300
          ? response.json()
          : response.json().then(Promise.reject.bind(Promise));
      })
      .then(response => {
        this.setState({ menusList: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes, match } = this.props;
    const { menusList } = this.state;
    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <DrawerMenu list={menusList} match={match} />
        </Drawer>
        <PageContainer>
          <Switch>
            <Route path={`${match.url}/info`} component={ManageInfo} />
            <Route
              path={`${match.url}/menues/:id`}
              render={props => (
                <ManageMenu
                  key={props.match.params.id}
                  restId={match.params.id}
                  {...props}
                />
              )}
            />
            <Route
              path={`${match.url}/create_menu`}
              render={props => (
                <CreateMenu restId={match.params.id} {...props} />
              )}
            />
            <Route path={`${match.url}/waiters`} component={ManageWaiters} />
          </Switch>
        </PageContainer>
      </div>
    );
  }
}

export default withStyles(styles)(RestaurantManagmentPage);
