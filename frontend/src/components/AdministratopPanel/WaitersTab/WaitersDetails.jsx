import React from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import OrderSummary from '../trash/OrderSummary';
import ExpPanel from './ExpPanel';
import OrderItemsList from '../../MenuPage/OrderItemsList'

const styles = theme => ({
  
});


function WaitersDetails(props) {
  const { classes, waiter } = props;
  const { w_orders } = waiter;
  return (
    <Grid container spacing={16}>
      {w_orders.length !== 0 ? w_orders.map((order, index) => {
          return (
            <Grid item xs={12}>
              <ExpPanel
                key={"Order" + waiter.id + index}
                summary={<OrderSummary order={order}/>}
                details={<OrderItemsList cartItems={order.items || []} />}
              />
            </Grid>
          )
        }) : (
          <Typography>
            {"No orders found"}
          </Typography>
        )
      }
    </Grid>
  )
}

export default withStyles(styles)(WaitersDetails);
