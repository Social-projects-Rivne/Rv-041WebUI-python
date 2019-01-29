import React from "react";
import PropTypes from "prop-types";
import { Grid, Card, CardContent } from "@material-ui/core";
import ProfileTabs from "../components/Profile/ProfileTabs";
import MyRestaurants from "./MyRestaurants";
import UserInfoPage from "./UserInfo";
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
                  exact
                  path={`${match.url}/personal_info`}
                  component={UserInfoPage}
                />
                <Route
                  exact
                  path={`${match.url}/my_restaurants`}
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

ProfilePage.propTypes = {
  match: PropTypes.object.isRequired
};

export default ProfilePage;
