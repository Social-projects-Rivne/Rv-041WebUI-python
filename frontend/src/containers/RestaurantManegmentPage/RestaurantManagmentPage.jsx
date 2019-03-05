import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import { withStyles, Drawer } from "@material-ui/core";

import PageContainer from "../PageContainer";
import ManageMenu from "./ManageMenu";
import ManageInfo from "./ManageInfo";
import ManageWaiters from "./ManageWaiters";
import DrawerMenu from "../../components/RestaurantManagment/Menu/DrawerMenu";
import CreateMenu from "../../components/RestaurantManagment/Menu/CreateMenu";
import ManageAdministrators from "./ManageAdministrators";

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

export const MenuContext = React.createContext();

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

  handleAddMenu = newItem => {
    this.setState(prevState => ({
      menusList: [...prevState.menusList, newItem]
    }));
  };

  render() {
    const { classes, match } = this.props;
    const { menusList } = this.state;
    return (
      <div className={classes.root}>
        <MenuContext.Provider value={{ menusList }}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.toolbar} />
            <DrawerMenu match={match} />
          </Drawer>
          <PageContainer>
            <Switch>
              <Route
                path={`${match.url}/info`}
                render={props => <ManageInfo restId={match.params.id} />}
              />
              <Route
                path={`${match.url}/menues/:id`}
                render={props =>
                  props.match.params.id !== "create_menu" ? (
                    <ManageMenu
                      menusList={menusList}
                      key={props.match.params.id}
                      restId={match.params.id}
                      {...props}
                    />
                  ) : (
                    <CreateMenu
                      onAddMenu={this.handleAddMenu}
                      key={props.match.params.id}
                      restId={match.params.id}
                      {...props}
                    />
                  )
                }
              />
              <Route
                path={`${match.url}/waiters`}
                render={props => <ManageWaiters restId={match.params.id} />}
              />
              <Route
                path={`${match.url}/administrators`}
                render={props => (
                  <ManageAdministrators restId={match.params.id} />
                )}
              />
            </Switch>
          </PageContainer>
        </MenuContext.Provider>
      </div>
    );
  }
}

RestaurantManagmentPage.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withStyles(styles)(RestaurantManagmentPage);
