import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  withStyles,
  Radio
} from "@material-ui/core";

const styles = theme => ({});

class WaitersRadio extends React.Component {
  render() {
    const { classes, waiters } = this.props;
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Pick waiter:</FormLabel>
        <RadioGroup
          aria-label="waiters"
          name="waiters"
          className={classes.group}
          value={this.props.pickedWaiter}
          onChange={this.props.handleWaiterPick}
          row
        >
          {waiters.map((waiter, w_index) => {
            return (
              <FormControlLabel
                key={"w" + w_index}
                value={waiter.id.toString()}
                control={<Radio color="primary" />}
                label={waiter.name}
                labelPlacement="bottom"
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    );
  }
}

export default withStyles(styles)(WaitersRadio);
