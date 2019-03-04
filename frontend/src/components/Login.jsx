import React from "react";
import PropTypes, { string } from "prop-types";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Grid,
  CardHeader,
  Typography,
  Divider,
  Snackbar
} from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import SnackbarContent from "./SnackbarContent";

const styles = theme => ({
  root: {
    margin: "auto",
    marginTop: theme.spacing.unit * 16
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
      .then(response => {
        return response.status >= 200 && response.status < 300
          ? response.json()
          : response.json().then(Promise.reject.bind(Promise));
      })
      .then(json => {
        const { success, error, data } = json;
        const { role, token, userName } = data;

        if (success && role && token && userName) {
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("userName", userName);
          this.props.state.changeState({
            auth: true,
            token,
            role,
            userName
          });
        } else {
          throw error;
        }
      })
      .then(() => {
        const rolesToRedirect = {
          Admin: "/admin",
          Moderator: "/moderator",
          Owner: "/profile/restaurants",
          Client: "/restaurants",
          Waiter: "/waiter"
        };

        const { from } = this.props.location.state || {
          from: { pathname: rolesToRedirect[localStorage.getItem("role")] }
        };

        this.props.history.push(from);
      })
      .catch(json => {
        this.setState({
          error: true,
          errorMes: "" + json
        });
      });
  };

  render() {
    const { error, errorMes } = this.state;
    const { classes } = this.props;

    let snackBarMessage = "";
    if (!errorMes || errorMes.search("fetch") !== -1) {
      snackBarMessage = "No connection to the server";
    } else {
      snackBarMessage = "" + errorMes;
    }

    return (
      <Card className={classes.root}>
        <CardHeader
          title={
            <>
              <Typography variant="h5" align="center">
                Sign In
              </Typography>
              <Typography variant="subtitle1" align="center">
                to continue E-Restaurant
              </Typography>
            </>
          }
        />
        <Divider />
        <CardContent>
          <ValidatorForm
            ref="form"
            onSubmit={e => this.handleSubmit(e)}
            debounceTime={500}
          >
            <Grid container spacing={32}>
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
                open={error}
                autoHideDuration={10000}
                onClose={this.handleClose}
              >
                <SnackbarContent
                  onClose={this.handleClose}
                  variant="error"
                  message={
                    <Typography color="inherit" align="center">
                      {snackBarMessage || "Something went wrong!"}
                    </Typography>
                  }
                />
              </Snackbar>
              <Grid item xs={12}>
                <Grid container justify="space-between">
                  <Button
                    replace
                    component={Link}
                    to="/sign-up"
                    color="primary"
                  >
                    Create account
                  </Button>
                  <Button type="submit" color="primary" variant="contained">
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </ValidatorForm>
        </CardContent>
      </Card>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
