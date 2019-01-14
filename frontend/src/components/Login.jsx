import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Button, 
         TextField, 
         Card, 
         CardContent, 
         Grid, 
         CardHeader, 
         Typography } from '@material-ui/core/';


const styles = (theme) => ({
  root: {
    maxWidth: 800,
    margin: "0 auto",
    marginTop: 20
  }

})


class Login extends React.Component {
  constructor(props) {
      super(props);
      this.state={
        email:'',
        password:'',
        error: false, 
        errorMes: ''
      }
    }

  handleChange = (event, value) => {
        this.setState({ [value]: event.target.value });
  }
  
  handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      email: this.state.email,
      password: this.state.password
    }
    if (body.email === '') {
      this.setState({
        error: true,
        errorMes: 'Email field cannot be empty'
      })
    } else if (body.password === '') {

      this.setState({
        error: true,
        errorMes: 'Password field cannot be empty'
      })
    } else {
      fetch('http://localhost:6543/api/login', {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      })
      .then(response => response.json())
      .then(input => {
          const { success, error, data } = input;
          const { role, token } = data;
          if (success && role && token) {
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            this.props.state.changeState({auth: true})
            this.setState({
            error: false,
            errorMes: ''
          });
            this.props.history.push("/restaurants")

          } else {
            throw error
          }
        })
        .catch((error) => {
            this.setState({
              error: true,
              errorMes: error
            })
        })
    }
  }

  render() {
      const { classes } = this.props;
      const { error, errorMes } = this.state
      return (
          <div className={classes.root}>
            <Card >
            <form onSubmit = {this.handleSubmit}>
              <CardHeader title={
                <Typography variant="h4" align='center'>
                  Login page.
                </Typography>
              }/>
              <CardContent>
                <Grid container spacing={24} >
                  <Grid item xs={12}>
                   <TextField
                     label="Enter your Email"
                     fullWidth
                     required={true}
                     onChange = {(e, value) => this.handleChange(e, "email")}
                     />
                   </Grid>
                   <Grid item xs={12}>
                     <TextField
                       type="password"
                       label="Enter your Password"
                       fullWidth
                       required={true}
                       onChange = {(e, value) => this.handleChange(e, "password")}
                       />
                      </Grid>
                      {error && (
                        <Grid item xs={12}>
                          <Typography variant="h6" align='center'>
                            {errorMes}
                          </Typography>
                        </Grid>
                      )}
                      <Grid style={{ display: "flex" }} item xs={12} justify="flex-end">
                        <Button type="submit" color="primary" variant="contained">Submit</Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                  </form>
             </Card>
            </div>
        
      );
    }
}

export default withStyles(styles)(Login);