import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  Typography,
  Paper
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import red from "@material-ui/core/colors/red";

const styles = theme => ({
  card: {

  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  avatar: {
    backgroundColor: red[500]
  },
  chip: {
    margin: theme.spacing.unit,
  },
});


function Order(props) {

  const { classes, order, changeOrderStatus } = props;
  const { id, status, items } = order;
  const date = new Date(order.creation_time * 1000);
  let buttonArray = [];
  let statusColor = "inherit";
  const dateModified = new Date().getTime();

  switch (status) {
    case "Asigned waiter":
      buttonArray.push(<Button
        key={0}
        size="small"
        color="primary"
        onClick={() => changeOrderStatus(id, "Start order", dateModified)}
      >
        Start order
      </Button>);
      statusColor = "secondary";
      break;
    case "In progress":
      buttonArray.push(<Button
        key={0}
        size="small"
        color="secondary"
        onClick={() => changeOrderStatus(id, "Close order", dateModified)}
      >
        Close order
      </Button>);
      statusColor = "primary";
      break;
    default:
      ;
  }

  return (
    <Card className={classes.card}>
      <Paper style={{ display: "flex", alignItems: "center" }}>
        <CardHeader
          avatar={
            <Avatar aria-label={order.user} className={classes.avatar}>
              {order.user[0]}
            </Avatar>
          }
          title={
            <Typography>
              {order.user}

            </Typography>
          }
          subheader={"Added: " + String(date.toISOString().slice(0, 10))}
        />
        <div style={{ marginLeft: "auto" }}>
          <Chip style={{ marginLeft: "auto " }} label={status} color={statusColor} className={classes.chip} />

        </div>
      </Paper>

      <CardContent>
        <Grid container>
          <Table className={classes.table}>
            <TableBody>
              {items.map((orderItem, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th">
                      <Typography className={classes.heading}>
                        {orderItem.name}
                      </Typography>
                      <Typography className={classes.secondaryHeading}>
                        price: ${orderItem.price}
                      </Typography>
                    </TableCell>
                    <TableCell component="th">
                      <Typography>
                        {orderItem.quantity} serv.
                      </Typography>
                    </TableCell>
                    <TableCell component="th">
                      <Typography gutterBottom variant="subtitle1">
                        {"$" + (orderItem.quantity * orderItem.price).toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <Grid container justify="flex-end" alignItems="flex-end" direction="column">
                    <Grid>
                      <Typography gutterBottom variant="subtitle1" >
                        Order sum: {"$" + order.total_price}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

        </Grid>
      </CardContent>

      <CardActions className={classes.actions}>
        {buttonArray.map(button => button)}
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(Order);