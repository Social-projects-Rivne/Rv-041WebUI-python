import React from "react";
import { withStyles, Card } from "@material-ui/core";

const styles = theme => ({
  card: {
    position: "sticky",
    height: "80vh",
    top: "30px"
  }
});

class OrderCart extends React.Component {
  render() {
    const { classes } = this.props;
    return <Card className={classes.card}>{"djksajdkl"}</Card>;
  }
}

export default withStyles(styles)(OrderCart);
