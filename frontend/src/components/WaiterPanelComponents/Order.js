import React from "react";
import classnames from 'classnames';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  IconButton,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  Typography,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeDate } from "../../Service/functions";

const styles = theme => ({
  card: {

  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500]
  },
  chip: {
    margin: theme.spacing.unit,
  },
});


class Order extends React.Component {

  state = {
    expanded: false,
  }

  buttonArray = (id, status) => {

    let buttons = [];
    let statusColor = "default";
    const dateModified = new Date().getTime();
  
    switch (status) {
      case "Asigned waiter":
        buttons.push(<Button
          key={0}
          size="small"
          color="primary"
          variant="contained"
          onClick={() => this.props.changeOrderStatus(id, "In progress", dateModified)}
        >
          Start order
        </Button>);
        statusColor = "secondary";
        break;
      case "In progress":
        buttons.push(<Button
          key={0}
          size="small"
          color="secondary"
          variant="contained"
          onClick={() => this.props.changeOrderStatus(id, "History", dateModified)}
        >
          Close order
        </Button>);
        statusColor = "primary";
        break;
      default:
        ;
    }
    return buttons;
  };

  handleExpandClick = () => {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  };

  render() {

    const { expanded }  = this.state;
    const { classes, order } = this.props;
    const { id, status, items } = order;
    const creationDateString = makeDate(order.creation_time);
    const bookingDateString  = makeDate(order.booked_time);

    let statusColor = status === "In progress" ? "primary": "secondary";
  
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
                {"Client: " + order.user + " | phone: " + order.phone_number + " | email: " + order.email}
              </Typography>
            }
            subheader={
              "№" + id + 
              " | Created: " + creationDateString + 
              " | Booked for: " + bookingDateString 
            }
          />
          <div style={{ marginLeft: "auto" , padding: 8 }}>
            <Grid container alignItems="center" justify="space-between" spacing={16}>
              <Grid item >
                <Typography style={{ marginLeft: "auto " }} variant="body2" noWrap >
                  Order items: {items.length}
                </Typography>
              </Grid>
              <Grid item >
                <Typography style={{ marginLeft: "auto " }} variant="body2" noWrap >
                  Order sum: {"$" + order.total_price}
                </Typography>
              </Grid>
              <Grid item >
                <Chip style={{ marginLeft: "auto " }} label={status} color={statusColor} className={classes.chip} />
              </Grid>
              <Grid item >
                <CardActions className={classes.actions}>
                  <IconButton
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
              </Grid>
            </Grid>
          </div>
        </Paper>
  
        <Collapse in={expanded} timeout="auto" unmountOnExit>
  
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
          {this.buttonArray(id, status).map(button => button)}
        </CardActions>
  
        </Collapse>
  
      </Card>
    )
  

  }
}

export default withStyles(styles)(Order);