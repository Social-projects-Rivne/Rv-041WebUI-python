import React from "react";
import { withStyles, Card } from "@material-ui/core";
import OrderCartItem from "./OrderCartItem";

const styles = theme => ({
  card: {
    position: "sticky",
    height: "80vh",
    top: "30px"
  }
});

class OrderCartList extends React.Component {
  render() {
    const { classes, items } = this.props;
    return (
      <Card className={classes.card}>
        {items.map(item => {
          return <OrderCartItem item={item} />;
        })}
      </Card>
    );
  }
}

export default withStyles(styles)(OrderCartList);
