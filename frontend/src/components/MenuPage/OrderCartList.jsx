import React from "react";
import { withStyles, Card, Button, CardContent } from "@material-ui/core";
import OrderCartItem from "./OrderCartItem";

const styles = theme => ({
  card: {
    position: "sticky",
    height: "80vh",
    overflow: "scroll",
    top: "30px"
  },
  submitButton: {
    marginTop: "8px"
  }
});

class OrderCartList extends React.Component {
  render() {
    const { classes, items } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent style={{ padding: "8px" }}>
          {items.map((item, index) => {
            return <OrderCartItem item={item} key={item.name + index} />;
          })}
          {items.length > 0 && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              {"Submit order"}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(OrderCartList);
