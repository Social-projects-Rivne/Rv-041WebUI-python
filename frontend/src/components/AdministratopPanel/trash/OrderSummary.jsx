import React from "react";
import {
  withStyles,
  Grid,
  Typography,
  Chip
} from "@material-ui/core";

const styles = theme => ({
  chip: {
    background: theme.palette.secondary.light,
    color: theme.palette.primary.dark
  }
});

function OrderSummary(props) {
    const { classes, order } = this.props;
    return (
      <Grid container spacing={16} justify="space-between" alignItems="center">
        <Grid item spacing={16} container xs={4} nowrap="true">
          <Grid item>
            <Typography gutterBottom variant="h6">
              Order id#{order.id}
            </Typography>
          </Grid>
          <Grid item>
            <Chip
              label={order.status}
              className={classes.chip}
              style={{ marginRight: "16px" }}
            />
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography gutterBottom variant="h6" component="p">
            User: {order.user.name || ""}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography gutterBottom variant="h6" component="p">
            Date created: {order.creation_date || ""}
          </Typography>
        </Grid>
      </Grid>
  );
}


export default withStyles(styles)(OrderSummary);
