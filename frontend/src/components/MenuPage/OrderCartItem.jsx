import React from "react";
import { withStyles, Card } from "@material-ui/core";

const styles = theme => ({
  card: {}
});

class OrderCartItem extends React.Component {
  render() {
    const { classes, name, quantity, price } = this.props;
    return <Card className={classes.card} />;
  }
}

export default withStyles(styles)(OrderCartItem);
