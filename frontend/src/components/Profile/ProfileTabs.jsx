import React from "react";
import { Person, Comment, Store, History, ListAlt } from "@material-ui/icons";
import { Tab, withStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    borderLeft: "2px solid #fafafa",
    height: "100%"
  },
  tab: {
    transition: theme.transitions.create("opacity"),
    "&.active": {
      color: theme.palette.secondary.dark,
      opacity: 1
    }
  }
});

const ProfileTabs = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Tab
        className={classes.tab}
        component={NavLink}
        to="/profile/personal_info"
        icon={<Person />}
        label="Personal Info"
      />
      <Tab
        className={classes.tab}
        component={NavLink}
        to="/profile/current_orders/"
        icon={<ListAlt />}
        label="Current Orders"
      />
      <Tab
        className={classes.tab}
        component={NavLink}
        to="/profile/order_history/"
        icon={<History />}
        label="Order History"
      />
      <Tab icon={<Comment />} label="Comments" />
      <Tab
        disableRipple
        className={classes.tab}
        component={NavLink}
        to="/profile/restaurants"
        icon={<Store />}
        label="My Restaurants"
      />
    </div>
  );
};

export default withStyles(styles)(ProfileTabs);
