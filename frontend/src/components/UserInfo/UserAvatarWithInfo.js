import React from 'react';
import { Redirect } from 'react-router';
import {withStyles} from '@material-ui/core/styles';
import UserInfo from "./UserInfo";
import UserAvatar from "./UserAvatar";
import {redirectToSignUp} from "../../Service/NeedAuthorization";

const styles = {
    forDiv: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
    },
};

class UserAvatarWithInfo extends React.Component {

    state = {
        userInfo: [],
        success: false,
        error: "",
    };

    componentDidMount() {
        fetch('http://localhost:6543/profile')
            .then(response => response.json())
            .then(data => this.setState({userInfo: data.data[0], success: data.success, error: data.error}))
            .catch(err=>console.log(err))
    }

    render() {
        const {classes} = this.props;
        const {userInfo, success, error} = this.state;

        let redirection = false;
        //if success is not true - find if there Forbidden issue
        if (success === false){
            redirection = redirectToSignUp(error);
        }
        //check if redirection must occur
        if (redirection === false){
            return (
                <div className={classes.forDiv}>
                    <UserAvatar userInfo={userInfo}/>
                    <UserInfo userInfo={userInfo}/>
                </div>);
        }
        else{
            return (redirection);
        }
    }
}

export default withStyles(styles)(UserAvatarWithInfo);
