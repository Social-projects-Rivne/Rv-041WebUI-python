import React from "react";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import 'typeface-roboto';

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

class SubmittedForm extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Grid container justify='center' className={classes.form}>
          <Typography variant="h4" align='center'>
            {this.props.message}
          </Typography>
          <Grid container direction='column' alignContent='center'>
            <Grid item>
              <Button variant="outlined" href="/" className={classes.button}>
                Go to homepage
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      serverResponse: false,
      errors: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const {name, email, password} = this.state;
    const formData = {name, email, password};
    const requestConfig = {
      headers: new Headers({"Content-Type": "application/json"}),
      method: "POST",
      body: JSON.stringify(formData),
    };
    fetch("http://localhost:6543/api/sign-up", requestConfig)
      .then(response => response.json())
      .then(response => this.setState({serverResponse: response.success}))
      .catch(error => this.setState({errors: true}));
  }

  render() {
    const {classes} = this.props;
    if (this.state.errors) {
      return (
        <SubmittedForm classes={classes} message={"Ooops something went wrong!"}/>

      );
    } else if (this.state.serverResponse) {
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
            <form onSubmit={this.handleSubmit}>
              <Grid container direction='column' alignContent='center'>
                <CardContent>
                  <Grid item>
                    <TextField
                      required
                      label="Name"
                      defaultValue=""
                      onChange={this.handleChange}
                      className={classes.textField}
                      margin="normal"
                      name="name"
                    />
                    <TextField
                      required
                      label="Email"
                      defaultValue=""
                      onChange={this.handleChange}
                      className={classes.textField}
                      margin="normal"
                      name="email"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      required
                      label="Password"
                      onChange={this.handleChange}
                      className={classes.textField}
                      type="password"
                      margin="normal"
                      name="password"
                    />
                    <TextField
                      required
                      label="Confirm password"
                      className={classes.textField}
                      type="password"
                      margin="normal"
                    />
                  </Grid>
                </CardContent>
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Create an account
                </Button>
              </Grid>
            </form>
          </Card>
        </Grid>
      );
    }
  }
}

export default withStyles(styles)(SignUpForm);