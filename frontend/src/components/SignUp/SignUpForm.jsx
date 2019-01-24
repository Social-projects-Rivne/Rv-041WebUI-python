import React from "react";

import SubmittedForm from "./SubmittedForm"

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = theme => ({
  form: {
    marginTop: 50,
  },
  cardBody: {
    padding: 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  button: {
    margin: theme.spacing.unit,
  },
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
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleSubmit = e => {
    e.preventDefault();
    const {name, email, password} = this.state;
    const formData = {name, email, password};
    const requestConfig = {
      headers: new Headers({"Content-Type": "application/json"}),
      method: "POST",
      body: JSON.stringify(formData),
    };
    fetch("http://localhost:6543/api/sign_up", requestConfig)
      .then(response => response.json())
      .then(response => this.setState({serverResponse: response.success}))
      .catch(error => this.setState({errors: true}));
  };

  render() {
    const {classes} = this.props;
    if (this.state.serverResponse) {
      return (
        <SubmittedForm classes={classes} message={"Thanks for registration!"}/>
      );
    } else {
      return (
        <Grid container justify='center' className={classes.form}>
          <Card className={classes.cardBody}>
            <Typography variant="h4" align='center'>
              Create your account
            </Typography>
            <ValidatorForm ref="form" onSubmit={this.handleSubmit} debounceTime={2000}>
              <Grid container direction='column' alignContent='center'>
                <CardContent>
                  <Grid item>
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
                      margin="normal"
                      name="name"
                    />
                    <TextValidator
                      label="Email"
                      onChange={this.handleChange}
                      className={classes.textField}
                      validators={['required', 'isEmail']}
                      errorMessages={[
                        "Email is required",
                        "Email is not valid"
                        ]}
                      value={this.state.email}
                      margin="normal"
                      name="email"
                    />
                  </Grid>
                  <Grid item>
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
                      margin="normal"
                      name="password"
                      helperText="Password must have minimum 8 characters"
                    />
                    <TextValidator
                      label="Confirm password"
                      onChange={this.handleChange}
                      className={classes.textField}
                      validators={['required', 'isPasswordMatch']}
                      errorMessages={[
                        "Please repeat password",
                        "Password mismatch"
                        ]}
                      value={this.state.repeated_password}
                      type="password"
                      margin="normal"
                      name="repeated_password"
                    />
                    {this.state.errors &&
                    (<Grid item>
                      <Typography variant="body2" color="error" align='center'>
                        Ooops something went wrong! Please try again later.
                      </Typography>
                    </Grid>)}
                  </Grid>
                </CardContent>
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Create an account
                </Button>
              </Grid>
            </ValidatorForm>
          </Card>
        </Grid>
      );
    }
  }
}

export default withStyles(styles)(SignUpForm);