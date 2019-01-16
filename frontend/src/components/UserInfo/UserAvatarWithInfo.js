import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import UserInfo from "./UserInfo";
import UserAvatar from "./UserAvatar";
import {redirectToSignUp} from "../../Service/NeedAuthorization";
import GeneralError from "../ErrorPages/GeneralError";

const styles = {
    forDiv: {
        display: "flex",
        justifyContent: "center",
    },
};

class UserAvatarWithInfo extends React.Component {

    state = {
        needRedirection: false,
        userInfo: [],
        success: null,
        error: "",
        token: localStorage.getItem("token"),
    };

    componentDidMount() {

        const headers = new Headers({
            'Content-Type': 'application/json',
            'X-Auth-Token': this.state.token
        });

        fetch('http://localhost:6543/api/profile', {method: "GET", headers})
            .then(response => (response.status === 403 ? this.setState({needRedirection: true, success: false}): response.json()))
            .then(data => this.setState({userInfo: data.data, success: data.success, error: data.error}))
            .catch(err => this.setState({success: false, error: err.message}))
    }

    render() {
        const {classes} = this.props;
        const {needRedirection, userInfo, success, error} = this.state;

        //prevent for rendering without fetch completing
        if (success === null){
            return null;
        }

        if (needRedirection === true){
            let redirection = redirectToSignUp(error);
            return redirection;
        }
        else{
            if(success){
                return (
                    <div className={classes.forDiv}>
                        <UserAvatar userInfo={userInfo}/>
                        <UserInfo userInfo={userInfo}/>
                    </div>);
            }
            else{
                return(<GeneralError error={error}/>);
            }
        }
    }
}

export default withStyles(styles)(UserAvatarWithInfo);
