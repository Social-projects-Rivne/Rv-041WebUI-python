import React from "react";
import { withStyles } from "@material-ui/core/styles";
import UserInfo from "./UserInfo";
import UserAvatar from "./UserAvatar";
import { redirectToSignUp } from "../../Service/NeedAuthorization";
import GeneralError from "../ErrorPages/GeneralError";

const styles = {
  forDiv: {
    display: "flex",
    justifyContent: "center"
  }
};

class UserAvatarWithInfo extends React.Component {
  state = {
    needRedirection: false,
    userInfo: [],
    success: null,
    error: "",
    token: localStorage.getItem("token"),
    imgBody: null,
    img: null  };

  componentDidMount() {
    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Auth-Token": this.state.token
    });

    fetch("http://localhost:6543/api/profile", { method: "GET", headers })
      .then(response =>
        response.status === 403
          ? this.setState({ needRedirection: true, success: false })
          : response.json()
      )
      .then(data =>
        this.setState({
          userInfo: data.data,
          success: data.success,
          error: data.error
        })
      )
      .catch(err => this.setState({ success: false, error: err.message }));
  };

  handleImageChange = e => {

    const img = e.target.files[0];
    let formData = new FormData();
    formData.append("img", img);

    fetch("http://localhost:6543/api/file", {
      method: "POST",
      headers: {
        "x-auth-token": localStorage.getItem("token")
      },
      body: formData
    })
    .then(response =>
      !(response.status >= 200 && response.status < 300)
        ? response.json().then(Promise.reject.bind(Promise))
        : response.json()
    )
    .then(data => {
      const user_id = this.state.userInfo["id"];
      if (user_id && data) {
        let requestBody ={
          "img": data  
        };

        fetch(`http://localhost:6543/api/user/${user_id}`, {
          method: "PUT",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody)
        })
        .then(response =>
          !(response.status >= 200 && response.status < 300)
            ? response.json().then(Promise.reject.bind(Promise))
            : response.json()
        )
        .then(data =>
          this.setState(prevState => {
            let prevUserInfo = prevState.userInfo;
            prevUserInfo["img"] = requestBody["img"];
            return({
              success: data.success,
              userInfo: prevUserInfo,
            });
          })
        )  
        .catch(err => console.log("" + err));
        
      }

    })
    .catch(err => console.log("" + err));


    /*e.target.files[0] &&
      this.setState({
        imgBody: e.target.files[0],
        img: URL.createObjectURL(e.target.files[0])
      });*/
  };

  render() {
    const { classes } = this.props;
    const { needRedirection, userInfo, success, error } = this.state;

    //prevent for rendering without fetch completing
    if (success === null) {
      return null;
    }

    if (needRedirection === true) {
      let redirection = redirectToSignUp(error);
      return redirection;
    } else {
      if (success) {
        return (
          <div className={classes.forDiv}>
            <UserAvatar 
              userInfo={userInfo}
              handleImageChange={this.handleImageChange} 
            />
            <UserInfo userInfo={userInfo} />
          </div>
        );
      } else {
        return <GeneralError error={error} />;
      }
    }
  }
}

export default withStyles(styles)(UserAvatarWithInfo);
