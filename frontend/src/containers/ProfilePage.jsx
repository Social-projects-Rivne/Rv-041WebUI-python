import React from "react";
import PropTypes from "prop-types";
import { Grid, Card, CardContent } from "@material-ui/core";
import ProfileTabs from "../components/Profile/ProfileTabs";
import MyRestaurants from "./MyRestaurants";
import UserInfoPage from "./UserInfo";
import OrderListPage from "./OrderListPage";
import PageContainer from "./PageContainer";
import { Route, Switch } from "react-router-dom";

const ProfilePage = props => {
  const { match } = props;
  return (
    <PageContainer>
      <Card>
        <CardContent>
          <Grid container spacing={16}>
            <Grid item xs={10}>
              <Switch>
                <Route
                  path={`${match.url}/personal_info`}
                  component={UserInfoPage}
                />
                <Route
                  path={`${match.url}/current_orders`}
                  key="current"
                  render={(props) => <OrderListPage 
                    status="current"
                    {...props}
                  />}
                />
                <Route
                  path={`${match.url}/order_history`}
                  key="history"
                  render={(props) => <OrderListPage
                    status="history"
                    {...props}
                  />}
                />
                <Route
                  path={`${match.url}/restaurants`}
                  component={MyRestaurants}
                />
                <Route path={match.url} render={() => <MyRestaurants />} />
              </Switch>
            </Grid>
            <Grid item xs={2}>
              <ProfileTabs />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

ProfilePage.propTypes = {
  match: PropTypes.object.isRequired
};

export default ProfilePage;
