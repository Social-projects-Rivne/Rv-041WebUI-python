import React from "react";

function withRest(Component, url) {
  class WithRest extends React.Component {
    state = {
      response: {
        data: [],
        error: "",
        message: "",
        success: false
      }
    };

    componentDidMount() {
      this.getData();
    }

    getData = () => {
      const id = this.props.match.params.id;
      console.log(id);
      fetch(`http://localhost:6543/${url}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        }
      })
        .then(response => response.json())
        .then(response => this.setState({ response }));
    };

    createData = data => {
      fetch(`http://localhost:6543/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(response => {
          const data = [...this.state.response.data, ...response.data];
          response.data = data;

          this.setState({ response });
        });
    };

    updateData = id => {
      fetch(`http://localhost:6543/${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        }
      })
        .then(response => response.json())
        .then(response => {
          const data = [...this.state.response.data, ...response.data];
          response.data = data;

          this.setState({ response });
        });
    };

    render() {
      return this.state.response.success ? (
        <Component
          response={this.state.response}
          get={this.getData}
          create={this.createData}
          update={this.updateData}
          {...this.props}
        />
      ) : (
        <p>Loading...</p>
      );
    }
  }

  return WithRest;
}

export default withRest;
