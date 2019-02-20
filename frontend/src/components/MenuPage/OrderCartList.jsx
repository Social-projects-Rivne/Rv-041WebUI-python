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
            return (
              <OrderCartItem
                item={item}
                key={item.name + index}
                handleRemoveItem={this.props.handleRemoveItem}
                handleQuantityChange={this.props.handleQuantityChange}
              />
            );
          })}
          {items.length > 0 && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submitButton}
              onClick={this.props.handleDialogToggle}
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
