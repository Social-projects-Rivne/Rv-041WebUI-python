import React from "react";
import PropTypes from "prop-types";
import PageContainer from "../PageContainer";
import ManageMenu from "./ManageMenu";
import ManageInfo from "./ManageInfo";
import DrawerMenu from "../../components/RestaurantManagment/DrawerMenu";
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
    width: drawerWidth
  },
  toolbar: { ...theme.mixins.toolbar }
});

export class RestaurantManagmentPage extends React.Component {
  state = {};

  render() {
    const { classes, match } = this.props;

    return (
      <PageContainer>
        <div className={classes.root}>
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
          <main className={classes.content}>
            <Switch>
              <Route path={`${match.url}/info`} component={ManageInfo} />
              <Route
                path={`${match.url}/menues`}
                render={() => <ManageMenu match={match} />}
              />
            </Switch>
          </main>
        </div>
      </PageContainer>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RestaurantManagmentPage);
