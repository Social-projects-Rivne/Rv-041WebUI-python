import React from "react";
import "date-fns";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  withStyles,
  Slide,
  Grid,
  Typography
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";
import OrderItemsList from "./OrderItemsList";

const styles = theme => ({
  dialog: {
    width: "900px",
    margin: "auto"
  }
});

function Transition(props) {
  return <Slide direction="left" {...props} />;
}

class OrderConfirmDialog extends React.Component {
  state = {
    selectedDate: new Date()
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;

    return (
      <div>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          keepMounted
          maxWidth={false}
          className={classes.dialog}
          onClose={this.props.handleClickToggle}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Order confirmation"}
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6">{"Please chose date"}</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container className={classes.grid} justify="space-around">
                <DatePicker
                  margin="normal"
                  label="Date picker"
                  value={selectedDate}
                  onChange={this.handleDateChange}
                />
                <TimePicker
                  margin="normal"
                  label="Time picker"
                  value={selectedDate}
                  onChange={this.handleDateChange}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <OrderItemsList
              cartItems={this.props.cartItems}
              handleDialogToggle={this.props.handleDialogToggle}
              handleRemoveItem={this.props.handleRemoveItem}
              handleQuantityChange={this.props.handleQuantityChange}
              controls
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={this.props.handleDialogToggle} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() =>
                this.props.sendSubmitOrder(this.state.selectedDate)
              }
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(OrderConfirmDialog);
