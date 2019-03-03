import React from "react";
import {
  Avatar,
  Button,
  CardMedia,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  Typography
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { Repeat } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeDate } from "../../Service/functions";

const styles = theme => ({
  root: {
    width: "100%"
  },
  image: {
    height: 100,
    width: 133.5,
    backgroundSize: "contain"
    /*paddingTop: "56.25%" // 16:9*/
  },
  avatar: {
    margin: 10
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

function UserOrders(props) {
  const { classes, orders, handleOrderDecline } = props;

  return (
    <div className={classes.root}>
      {orders.map((orderInfo, index) => {
        const creationDateString = makeDate(orderInfo.creation_time);
        const bookingDateString  = makeDate(orderInfo.booked_time);
        const orderItems = orderInfo.items;
        //extract photo to make icons
        let iconsArray = [];
        for (let i = 0; i < (orderItems.length > 3 ? 3 : orderItems.length); i++) {
          const orderItem = orderItems[i];
          iconsArray.push({
            "name": orderItem.name,
            "img": orderItem.img
          });
        }
        if (orderItems.length > 3) {
          iconsArray.push({
            "name": "more",
            "img": "https://www.materialui.co/materialIcons/hardware/keyboard_arrow_right_grey_192x192.png"
          })
        }
        return (
          <ExpansionPanel key={index} >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container justify="space-between" alignItems="center" spacing={8}>
                <Grid item key={1} xs={3} >
                  <Typography className={classes.heading}>
                    {orderInfo.restaurant}
                  </Typography>
                </Grid>
                <Grid item key={2} xs={3} >
                  <Typography className={classes.secondaryHeading}>
                    {"Created: " + creationDateString} <br />
                    {"Booked for: " + bookingDateString}
                  </Typography>
                </Grid>
                <Grid item key={3} xs={2} >
                  <Grid container alignItems="center">
                    {iconsArray.map((imgInfo, image_index) => {
                      return (
                        <Grid item key={image_index} xs={6} sm={2}>
                          <Avatar alt={imgInfo.name} src={imgInfo.img} className={classes.avatar} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
                <Grid item key={4} xs={2} >
                  <Typography>
                    {orderItems.length} items for ${orderInfo.total_price}
                  </Typography>
                </Grid>
                <Grid item key={5} xs={2} >
                  <Typography>
                    {orderInfo.status}
                  </Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={8}>
                <Table className={classes.table}>
                  <TableBody>
                    {orderItems.map((orderItem, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            <CardMedia
                              className={classes.image}
                              image={orderItem.img}
                              title={orderItem.name}
                            />
                          </TableCell>
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
                      <TableCell colSpan={4} align="right">
                        <Grid container justify="flex-end" alignItems="flex-end" direction="column">
                          <Grid>
                            <Typography gutterBottom variant="subtitle1" >
                              Order sum: {"$" + orderInfo.total_price}
                            </Typography>
                          </Grid>
                          {
                            (orderInfo.status === "Draft" || orderInfo.status === "Waiting for confirm") && (
                              <Grid>
                                <Button 
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleOrderDecline(orderInfo.id, orderInfo.status)}
                                >
                                  {orderInfo.status === "Draft" ? "Delete" : "Decline"}
                                </Button>
                              </Grid>
                            )
                          }
                          {/*TODO: <Grid>
                                <Button variant="contained" color="primary">
                                  Reorder
                                  <Repeat />
                                </Button>
                              </Grid>*/}
                        </Grid>
                      </TableCell>
                    </TableRow>
                    </TableFooter>
                </Table>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
}

export default withStyles(styles)(UserOrders);
