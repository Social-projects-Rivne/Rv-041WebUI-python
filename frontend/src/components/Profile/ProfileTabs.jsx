import React from "react";
import { Person, Comment, AddBox, History, ListAlt } from "@material-ui/icons";
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
    color: theme.palette.main,
    transition: theme.transitions.create("opacity"),
    "&.active": {
      color: theme.palette.secondary.light,
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
      {/* <Tab icon={<ListAlt />} label="Current Orders" />
      <Tab icon={<History />} label="Order History" />
      <Tab icon={<Comment />} label="Comments" /> */}
      <Tab
        disableRipple
        className={classes.tab}
        component={NavLink}
        to="/profile/my_restaurants"
        icon={<AddBox />}
        label="Add Restaurant"
      />
    </div>
  );
};

export default withStyles(styles)(ProfileTabs);
