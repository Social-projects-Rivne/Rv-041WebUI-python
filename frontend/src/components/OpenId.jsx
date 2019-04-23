import React from 'react';
import queryString from 'query-string';

class OpenId extends React.Component {
    componentDidMount() {
        const value=queryString.parse(this.props.location.hash);
        const payload = {
            "id_token": value.id_token
        };
        console.log(payload, this.props.location.hash, this.props)
        fetch("http://localhost:6543/api/login", {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
            })
            .then(response => {
                return response.status >= 200 && response.status < 300
                ? response.json()
                : response.json().then(Promise.reject.bind(Promise));
            })
            .then(json => {
                const { success, error, data } = json;
                const { role, token, userName, userImg } = data;

                if (success && role && token && userName) {
                    localStorage.setItem("token", token);
                    localStorage.setItem("role", role);
                    localStorage.setItem("userName", userName);
                    this.props.state.changeState({
                        auth: true,
                        token,
                        role,
                        userName,
                        userImg
                    });
                } else {
                    throw error;
                }
            })
            .then(() => {
                this.props.history.push("/");
            })
            .catch(json => {
                this.setState({
                    error: true,
                    errorMes: json.error
                });
            });
    
    };
    
    render() {
        return (
            <> </>
        )
    }
}

export default OpenId;