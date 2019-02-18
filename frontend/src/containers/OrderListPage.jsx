import React from "react";
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Card,
  CardContent,
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
  },
  image: {
    height: 100,
    width: 133.5,
    backgroundSize: "contain",
    /*paddingTop: "56.25%" // 16:9*/
  },
  avatar: {
    margin: 10,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  }
});

class OrderListPage extends React.Component {
  state = {
    token: localStorage.getItem("token"),
    isLoading: true,
    orders: [],
    expanded: null,
  };

  componentDidMount() {

    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": this.state.token
    });
    const route = "http://localhost:6543/api/profile/orders/" + this.props.status;
    const fetchInit = {
      method: "GET",
      headers: headers
    };

    fetch(route, fetchInit)
      .then(response =>
        !(response.status >= 200 && response.status < 300)
          ? Promise.reject(response.status)
          : response.json()
      )
      .then(data =>
        this.setState({
          isLoading: false,
          orders: data.data,
          success: data.success,
          error: data.error
        })
      )
      .catch(err => this.setState({ success: false, error: err.message, isLoading: false }));
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded, isLoading, orders } = this.state;

    if (isLoading) {
      return null;
    }

    return (
      <div className={classes.root}>
        {orders.map((orderInfo, index) => {
          const date = new Date(orderInfo.date_created * 1000);
          const orderItems = orderInfo.items;
          //extract photo to make icons
          let iconsArray = [];
          orderItems.forEach(orderItem => {
            iconsArray.push({
              "name": orderItem.name,
              "img": orderItem.img
            });  
          });
          return(
            <ExpansionPanel key={index} expanded={expanded === index} onChange={this.handleChange(index)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container justify="space-between" alignItems="center" spacing={8}>
                  <Grid key={1} item xs={6} sm={2}>
                    <Typography className={classes.heading}>
                      {orderInfo.restaurant}
                    </Typography>
                  </Grid>
                  <Grid key={2} item xs={6} sm={2}>
                    <Typography className={classes.secondaryHeading}>
                      {String(date.toISOString().slice(0, 10))}
                    </Typography>
                  </Grid>
                  <Grid container alignItems="center">
                    {iconsArray.map((imgInfo, image_index) => {
                      return(
                        <Grid key={image_index} item>
                          <Avatar key={index} alt={imgInfo.name} src={imgInfo.img} className={classes.avatar} />
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Grid key={4} item xs={6} sm={2}>
                    <Typography>
                      {orderItems.length} items for ${orderInfo.total_price}
                    </Typography>
                  </Grid>
                  <Grid key={5} item xs={6} sm={2}>
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
                              <Typography gutterBottom variant="h6">
                                {"$"+(orderItem.quantity*orderItem.price).toFixed(2)}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={4} align="right">
                          <Typography gutterBottom variant="h5" >
                            Order sum: {"$" + orderInfo.total_price}
                          </Typography>
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

}

export default withStyles(styles)(OrderListPage);
