import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  Grid,
  CardHeader,
  Typography
} from "@material-ui/core/";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "./SnackbarContent";

const styles = theme => ({
  root: {
    maxWidth: 800,
    margin: "0 auto",
    marginTop: 20
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false,
      errorMes: ""
    };
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ error: false });
  };

  handleChange = (event, value) => {
    this.setState({ [value]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const body = {
      email: this.state.email,
      password: this.state.password
    };
    fetch("http://localhost:6543/api/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(input => {
        const { success, error, data } = input;
        const { role, token } = data;
        if (success && role && token) {
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          this.props.state.changeState({
            auth: true,
            token,
            role
          });
          this.setState({
            error: false,
            errorMes: ""
          });
          this.props.history.push("/restaurants");
        } else {
          throw error;
        }
      })
      .catch(error => {
        this.setState({
          error: true,
          errorMes: error
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { error, errorMes } = this.state;
    return (
      <div className={classes.root}>
        <Card>
          <CardHeader
            title={
              <Typography variant="h5" align="center">
                Log In to Your Account
              </Typography>
            }
          />
          <CardContent>
            <ValidatorForm
              ref="form"
              onSubmit={e => this.handleSubmit(e)}
              debounceTime={500}
            >
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <TextValidator
                    label="Enter your Email"
                    onChange={e => this.handleChange(e, "email")}
                    validators={["required", "isEmail"]}
                    errorMessages={["Email is required", "Email is not valid"]}
                    value={this.state.email}
                    name="email"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    label="Enter your Password"
                    onChange={e => this.handleChange(e, "password")}
                    validators={["required"]}
                    errorMessages={["Password is required"]}
                    value={this.state.password}
                    name="password"
                    type="password"
                    fullWidth
                  />
                </Grid>
                <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  open={this.state.error}
                  autoHideDuration={10000}
                  onClose={this.handleClose}
                >
                  <SnackbarContent
                    onClose={this.handleClose}
                    variant="error"
                    message={
                      <Typography color="inherit" align="center">
                        {errorMes ? errorMes : "No connection to the server"}
                      </Typography>
                    }
                  />
                </Snackbar>
                <Grid item xs={12}>
                  <Grid container justify="flex-end">
                    <Button type="submit" color="primary" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </ValidatorForm>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
