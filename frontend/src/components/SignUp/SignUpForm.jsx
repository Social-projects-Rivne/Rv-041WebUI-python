import React from "react";
import PropTypes from "prop-types";
import SubmittedForm from "./SubmittedForm";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  CardHeader
} from "@material-ui/core/";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    margin: "auto",
    marginTop: theme.spacing.unit * 16
  }
});

class SignUpForm extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    repeated_password: "",
    serverResponse: false,
    errors: false
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const formData = { name, email, password };
    const requestConfig = {
      headers: new Headers({ "Content-Type": "application/json" }),
      method: "POST",
      body: JSON.stringify(formData)
    };
    fetch("http://localhost:6543/api/sign_up", requestConfig)
      .then(response => response.json())
      .then(response => this.setState({ serverResponse: response.success }))
      .catch(error => this.setState({ errors: true }));
  };

  render() {
    const { classes } = this.props;
    if (this.state.serverResponse) {
      return (
        <SubmittedForm classes={classes} message={"Thanks for registration!"} />
      );
    } else {
      return (
        <Grid container justify="center" className={classes.root}>
          <Card className={classes.cardBody}>
            <CardHeader
              title={
                <>
                  <Typography variant="h5" align="center">
                    Sing Up
                  </Typography>
                  <Typography variant="subtitle1" align="center">
                    to continue E-Restaurant
                  </Typography>
                </>
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
                      label="Password"
                      onChange={this.handleChange}
                      className={classes.textField}
                      validators={['required', "minStringLength:8"]}
                      errorMessages={[
                        "Password is required",
                        "Password must have at least 8 characters"
                        ]}
                      value={this.state.password}
                      type="password"
                      name="password"
                      helperText="Password must have minimum 8 characters"
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
                        to="/log-in"
                        color="primary"
                      >
                        Sign in instead
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
          </Card>
        </Grid>
      );
    }
  }
}

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SignUpForm);
