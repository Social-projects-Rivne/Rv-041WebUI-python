import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

class AlertDialogSlide extends React.Component {
  state = {
    open: false,
    selectedDate: new Date()
  };

  handleClickToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;

    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickToggle}
        >
          Slide in alert dialog
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClickToggle}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Please chose date or skip"}
          </DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickToggle} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.sendSubmitOrder} color="primary">
              Skip
            </Button>
            <Button onClick={this.props.sendSubmitOrder} color="primary">
              Skip
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;
