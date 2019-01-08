import React from "react";
import { Person, Comment, AddBox, History, ListAlt } from "@material-ui/icons";
import { Tab, withStyles } from "@material-ui/core";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    borderLeft: "2px solid #fafafa",
    height: "100%",
  },
};

const ProfileTabs = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Tab icon={<Person />} label="Personal Info" />
      <Tab icon={<ListAlt />} label="Current Orders" />
      <Tab icon={<History />} label="Order History" />
      <Tab icon={<Comment />} label="Comments" />
      <Tab icon={<AddBox />} label="Add Restaurant" />
    </div>
  );
};

export default withStyles(styles)(ProfileTabs);
