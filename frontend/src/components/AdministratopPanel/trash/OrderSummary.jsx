import React from "react";
import {
  withStyles,
  Grid,
  Typography,
  Chip
} from "@material-ui/core";
import format from 'date-fns/format';


const styles = theme => ({
    wrapperSummary:{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between"
    }
});

function OrderSummary(props) {
    const { classes, order } = props;
    return (
        <Grid
          container
          spacing={16}
          justify="space-between"
          alignItems="center"
        >
          <Grid item spacing={16} container xs={4} className={classes.wrapperSummary}>
            <Grid item>
              <Typography gutterBottom>
                Order id: #{order.id}
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                label={order.status}
                color="primary"
                style={{ marginRight: "16px" }}
              />
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography gutterBottom component="p">
              User: {order.user.name || ""}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography gutterBottom component="p">
              Time created: {format(order.creation_time * 1000, "HH:mm dd.MM") || ""}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography gutterBottom component="p">
              Booked at: {format(order.booked_time * 1000, "HH:mm dd.MM") || ""}
            </Typography>
          </Grid>
       </Grid>
  );
}


export default withStyles(styles)(OrderSummary);
