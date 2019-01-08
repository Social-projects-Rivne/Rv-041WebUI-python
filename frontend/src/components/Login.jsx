import React from "react";
import {withStyles} from '@material-ui/core/styles';
// import AppBar from '@material-ui/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Login extends React.Component {
  state={
      username:'',
      password:'',
      res:{}
    }
  handleClick(event) {
    fetch('http://localhost:6543/auth/login')
      .then(response => response.json())
      .then(data => this.setState({res: data}))
  }

  render() {
    console.log(this.state.res)
      return (
        <div>
          {/*<MuiThemeProvider>*/}
            <div>
{/*            <AppBar
               title="Login"
             />*/}
             <TextField
               label="Enter your Email"
               defaultValue="Email"
               onChange = {(event, newValue) => this.setState({username:newValue})}
               />
             <br/>
               <TextField
                 type="password"
                 label="Enter your Password"
                 defaultValue="Password"
                 onChange = {(event,newValue) => this.setState({password:newValue})}
                 />
               <br/>
               <Button label="Submit" onClick={(event) => this.handleClick(event)}/>
           </div>
           {/*</MuiThemeProvider>*/}
        </div>
      );
    }
}
const style = {
 margin: "0 auto",
};
export default withStyles(style)(Login);