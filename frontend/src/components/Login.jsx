import React from "react";
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Button, TextField, Card, CardContent, Grid } from '@material-ui/core/';


const styles = (theme) => ({
  root: {
    maxWidth: 800,
    margin: "0 auto",
    marginTop: "60px"
  }

})


class Login extends React.Component {
  // state={
  //     email:'',
  //     password:'',
  //   }

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
        console.log(res.data.error);
        localStorage.setItem('token', res.headers['x-auth-token']);
        localStorage.setItem('role', res.data.data[0]);
      })
      .then(
        this.props.state.changeState({auth: true})
      )
  }

  handleLogout = (event) => {
    axios.delete('http://localhost:6543/login', {
      headers: {
        'x-auth-token': localStorage.getItem('token')
      }
    }).then(res => {
        console.log(res.data.error);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      })
  }


  render() {
      const { classes } = this.props;
      // console.log(this.props)
      return (
          <div className={classes.root}>
            <Card >
            <form onSubmit = {this.handleSubmit}>
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
                      <Grid style={{ display: "flex" }} item xs={6} justify="flex-end">
                        <Button type="submit" color="primary" variant="contained">Submit</Button>
                      </Grid>
                      <Grid style={{ display: "flex" }} item xs={6} justify="flex-end">
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={(e) => this.handleLogout(e)}>Logout</Button>
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