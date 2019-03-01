import React from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  CardHeader,
  Snackbar
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import SnackbarContent from "../SnackbarContent";
import Clear from "@material-ui/icons/Clear";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';


const styles = theme => ({
  root: {
    margin: "auto",
    marginTop: theme.spacing.unit,
    maxWidth: 700
  }
});

class UserCreate extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    phoneNumber: null,
    birthDate: null,
    repeated_password: "",
    serverResponse: false,
    snackbarOpen: false,
    snackbarMessage: ""
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
    this.props.tabsDisplay(false);
  }
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDateChange = date => {
      this.setState({ birthDate: date })
  };

  clearBirthDate = () => {
    this.setState({birthDate: null});
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const phone_number = this.state.phoneNumber;
    const birth_date = this.state.birthDate;
    const formData = { name, email, password, phone_number, birth_date };
    const requestConfig = {
      headers: new Headers({
        "Content-Type": "application/json",
        'X-Auth-Token': localStorage.getItem("token")
        }),
      method: "POST",
      body: JSON.stringify(formData)
    };
    fetch('http://localhost:6543/api/user/' + this.props.userStatus, requestConfig)
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          this.setState({
            serverResponse: true
          });
        } else {
          throw json;
        }
      })
      .catch(error => {
        this.setState({
          snackbarOpen: true,
          snackbarMessage:
            error.error ||
            "Ooops something went wrong! Please try again later."
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { birthDate } = this.state;
    if (this.state.serverResponse) {
      return <Redirect to="/admin/moderators" />;
    } else {
      return (
        <Grid container className={classes.root}>
          <Card>
            <CardHeader
              title={
                  <Typography variant="h5" align="center">
                    Create Moderator Account
                  </Typography>
              }
            />
            <Divider />
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
              debounceTime={2000}
            >
              <CardContent>
                <Grid container spacing={32}>
                  <Grid item xs={12} md={6}>
                    <TextValidator
                      label="Name"
                      onChange={this.handleChange}
                      className={classes.textField}
                      validators={["required", "trim"]}
                      errorMessages={[
                        "Name is required",
                        "You didn't enter any character"
                      ]}
                      value={this.state.name}
                      name="name"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextValidator
                      label="Email"
                      onChange={this.handleChange}
                      className={classes.textField}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "Email is required",
                        "Email is not valid"
                      ]}
                      value={this.state.email}
                      name="email"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextValidator
                      label="Phone number"
                      onChange={this.handleChange}
                      className={classes.textField}
                      value={this.state.phoneNumber}
                      name="phoneNumber"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container alignItems={"flex-end"}>
                      <Grid item xs>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <DatePicker
                            label="Birth date"
                            value={birthDate}
                            onChange={this.handleDateChange}
                            name="birthDate"
                            fullWidth
                          />
                        </MuiPickersUtilsProvider>
                        {/* TODO: Change date format in the datepicker */}
                        {/* TODO: Add error when selected date greater than current date */}
                      </Grid>
                      <Grid item>
                        {this.state.birthDate != null &&
                          <Clear onClick={this.clearBirthDate}/>
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextValidator
                      label="Password"
                      onChange={this.handleChange}
                      className={classes.textField}
                      validators={["required", "minStringLength:8"]}
                      errorMessages={[
                        "Password is required",
                        "Password must have at least 8 characters"
                      ]}
                      value={this.state.password}
                      type="password"
                      name="password"
                      helperText="Password must have minimum 8 characters"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextValidator
                      label="Confirm password"
                      onChange={this.handleChange}
                      className={classes.textField}
                      validators={["required", "isPasswordMatch"]}
                      errorMessages={[
                        "Please repeat password",
                        "Password mismatch"
                      ]}
                      value={this.state.repeated_password}
                      type="password"
                      name="repeated_password"
                      fullWidth
                    />
                    {this.state.errors && (
                      <Grid item>
                        <Typography
                          variant="body1"
                          color="error"
                          align="center"
                        >
                          Ooops something went wrong! Please try again later.
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justify="space-between">
                      <Button
                        replace
                        component={Link}
                        to="/admin/moderators"
                        color="primary"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        Create account
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </ValidatorForm>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              open={this.state.snackbarOpen}
              autoHideDuration={10000}
              onClose={this.handleClose}
            >
              <SnackbarContent
                onClose={this.handleClose}
                variant="error"
                message={
                  <Typography color="inherit" align="center">
                    {this.state.snackbarMessage || "No connection to the server"}
                  </Typography>
                }
              />
            </Snackbar>
          </Card>
        </Grid>
      );
    }
  }
}

UserCreate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserCreate);
