import React from "react";
import {
  withStyles,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid
} from "@material-ui/core";

import MenuItem from "./MenuItem";

const styles = theme => ({
  menuContent: {
    margin: "0 -16px"
  }
});

const Menu = props => {
  const { classes } = props;
  return (
    <div className={classes.menu}>
      <Card>
        <CardHeader title="Menu" />
        <Divider />
        <CardContent className={classes.menuContent}>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <MenuItem />
            </Grid>
            <Grid item xs={12}>
              <MenuItem />
            </Grid>
            <Grid item xs={12}>
              <MenuItem />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(Menu);
