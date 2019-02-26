import React from "react";
import {
	Grid,
  Divider,
} from '@material-ui/core';
import Order from "./Order"
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3
	}
});

function Orders(props) {

	const { classes, orders, changeOrderStatus } = props;

	return (

		<Grid className={classes.root} container spacing={16}>
			{orders.map((order, index) => {
				return (
					<Grid item xs={12}key={index}>
						<Order
							order={order}
							changeOrderStatus={changeOrderStatus}
						/>
						<Divider />
					</Grid>
				);
			})}
		</Grid>
	)
}

export default withStyles(styles)(Orders);