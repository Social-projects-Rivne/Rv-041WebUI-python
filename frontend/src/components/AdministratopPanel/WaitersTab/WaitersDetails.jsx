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
  const { classes, waiter } = this.props;
  const { w_orders } = waiter;
  return (
    <>
      {w_orders == null ? w_orders.map((order, index) => {
          return (
            <ExpPanel
              key={"Order" + index}
              summary={<OrderSummary order={order}/>}
              details={
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <OrderItemsList cartItems={order.items || []} />
                  </Grid>
                </Grid>
              }
            />
          )
        }) : (
          <Typography>
            {"No orders found"}
          </Typography>
        )
      }
    </>
  )
}

export default withStyles(styles)(WaitersDetails);
