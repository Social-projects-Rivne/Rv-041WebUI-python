import React from "react";
import { withStyles, Grid, Card } from "@material-ui/core";
import ProfileTabs from "../components/Profile/ProfileTabs";
import MyRestaurant from "./MyRestaurant";

const styles = () => ({
  root: {
    maxWidth: "1280px",
    marginRight: "auto",
    marginLeft: "auto",
    paddingRight: 24,
    paddingLeft: 24,
  },
});

const Profile = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Card>
        <Grid container spacing={0}>
          <Grid item xs={10}>
            <MyRestaurant />
          </Grid>
          <Grid item xs={2}>
            <ProfileTabs />
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default withStyles(styles)(Profile);
