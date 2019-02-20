import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TextField,
  IconButton,
  Typography
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
});

function priceRow(qty, unit) {
  return (qty * unit).toFixed(2);
}

function priceTotal(items) {
  return items
    .map(({ price, quantity }) => price * quantity)
    .reduce((sum, i) => sum + i, 0)
    .toFixed(2);
}

function OrderItemsList(props) {
  const { classes, cartItems, controls } = props;
  return (
    <Paper className={classes.root} elevation="0">
      <Typography variant="h6">{"Order summary"}</Typography>
      <Table className={classes.table}>
        <TableHead>
          {controls && <TableCell>Action</TableCell>}
          <TableCell>Item name</TableCell>
          <TableCell>Volume</TableCell>
          <TableCell>Price per item, $</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Total price, $</TableCell>
        </TableHead>
        <TableBody>
          {cartItems.map((row, index) => {
            return (
              <TableRow key={row.id}>
                {controls && (
                  <TableCell padding="checkbox">
                    <IconButton
                      onClick={() => props.handleRemoveItem(row.id)}
                      aria-label="Remove item"
                      size="small"
                    >
                      <Clear />
                    </IconButton>
                  </TableCell>
                )}
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                {controls && (
                  <TableCell>
                    <TextField
                      value={row.quantity}
                      onChange={event =>
                        props.handleQuantityChange(
                          event,
                          row.quantity,
                          row.id,
                          true,
                          index
                        )
                      }
                      type="number"
                      className={classes.textField}
                    />
                  </TableCell>
                )}
                {!controls && (
                  <TableCell align="right">{row.quantity}</TableCell>
                )}
                <TableCell align="right">
                  {priceRow(row.quantity, row.price)}
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={controls ? 4 : 3} />
            <TableCell>Total:</TableCell>
            <TableCell align="right">{priceTotal(cartItems) + "$"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

OrderItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
  cartItems: PropTypes.array.isRequired,
  controls: PropTypes.bool.isRequired
};

export default withStyles(styles)(OrderItemsList);
