import React from "react";
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
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
    axios.post('http://localhost:6543/login', body)
      .then(res => {
        localStorage.setItem('token', res.headers['x-auth-token']);
        localStorage.setItem('role', res.data.data[0]);
      })
      .then(
        this.props.state.changeState({auth: true})
      )
  }

  render() {
      const { classes } = this.props;
      // console.log(this.props)
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
                     onChange = {(e, value) => this.handleChange(e, "email")}
                     />
                   </Grid>
                   <Grid item xs={12}>
                     <TextField
                       type="password"
                       label="Enter your Password"
                       fullWidth
                       onChange = {(e, value) => this.handleChange(e, "password")}
                       />
                      </Grid>
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