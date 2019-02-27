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
  state = {
    waiters: []
  };

  componentDidMount() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": localStorage.getItem("token")
    });
    const fetchInit = {
      method: "GET",
      headers: headers
    };
    fetch("http://localhost:6543/api/waiters", fetchInit)
      .then(response => response.json())
      .then(data => {
        this.setState({ waiters: data.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
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
          {this.state.waiters.map((waiter, w_index) => {
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
