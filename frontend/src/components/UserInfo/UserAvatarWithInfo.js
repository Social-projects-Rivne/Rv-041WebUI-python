import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import UserInfo from "./UserInfo";
import UserAvatar from "./UserAvatar";

const styles = {
    forDiv: {
        flexGrow: 1,
    },
};

class UserAvatarWithInfo extends React.Component {

    state = {
        userInfo: [],
    };

    componentDidMount() {
        fetch('http://localhost:6543/profile')
            .then(response => response.json())
            .then(data => this.setState({userInfo: data.data[0]}))
            .catch(err=>console.log(err))
    }

    render() {
        const {classes} = this.props;
        const {userInfo} = this.state;
        return (
            <div className={classes.forDiv}>
                <UserAvatar userInfo={userInfo}/>
                <UserInfo userInfo={userInfo}/>
            </div>
        );
    }

}


export default withStyles(styles)(UserAvatarWithInfo);
