import React from "react";
import { Grid, withStyles, Paper } from "@material-ui/core";
import Menu from "../components/MenuPage/Menu";

const styles = theme => ({
  root: {
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 24
  }
});

const MenuPage = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={10}>
          <Paper>
            <Menu />
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper>col-2</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(MenuPage);
