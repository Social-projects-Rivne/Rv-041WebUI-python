import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

function WaitersSummary(props) {
  const { waiter } = props;
  return (
    <Grid container spacing={16} justify="space-between" alignItems="center">
      <Grid item>
        <Typography gutterBottom>Waiter: {waiter.name}</Typography>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(WaitersSummary);
