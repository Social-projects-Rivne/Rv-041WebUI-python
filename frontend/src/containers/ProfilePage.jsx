import React from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import ProfileTabs from "../components/Profile/ProfileTabs";
import MyRestaurants from "./MyRestaurants";
import UserInfoPage from "./UserInfo";
import PageContainer from "./PageContainer";
import { Route, Switch } from "react-router-dom";

const Profile = props => {
  return (
    <PageContainer>
      <Card>
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs={10}>
              <Switch>
                <Route
                  exact
                  path={`${props.match.url}/personal_info`}
                  component={UserInfoPage}
                />
                <Route
                  exact
                  path={`${props.match.url}/my_restaurants`}
                  component={MyRestaurants}
                />
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

export default Profile;
