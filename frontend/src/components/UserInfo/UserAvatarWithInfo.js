import React from 'react';
import { Redirect } from 'react-router';
import {withStyles} from '@material-ui/core/styles';
import UserInfo from "./UserInfo";
import UserAvatar from "./UserAvatar";

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
        isForbidden: false,
    };

    componentDidMount() {
        fetch('http://localhost:6543/profile')
            .then(response => response.json())
            .then(data => this.setState({userInfo: data.data[0], isForbidden: data.error.toLowerCase().search("forbidden") === -1 ? false: true}))
            .catch(err=>console.log(err))
    }

    render() {
        const {classes} = this.props;
        const {userInfo, isForbidden} = this.state;
        console.log(isForbidden);
        if (isForbidden){
            return (<Redirect to='/log-in'/>);
        }
        else{
            return (
                <div className={classes.forDiv}>
                    <UserAvatar userInfo={userInfo}/>
                    <UserInfo userInfo={userInfo}/>
                </div>);
        }
    }
}

export default withStyles(styles)(UserAvatarWithInfo);
