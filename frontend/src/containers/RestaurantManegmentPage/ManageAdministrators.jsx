import React from "react";
import { ROLES } from "../../Service/constants";

import { Paper } from "@material-ui/core";

import WorkersList from "../../components/RestaurantManagment/WorkersList";
import CollapseForm from "../../components/CollapseForm";
import AddWorkerForm from "../../components/RestaurantManagment/AddWorkerForm";

class ManageAdministrators extends React.Component {
  state = {
    administrators: []
  };

  componentDidMount() {
    const restId = this.props.restId;
    fetch(
      `http://localhost:6543/api/workers/${restId}/${ROLES.ADMINISTRATOR}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        }
      }
    )
      .then(response => {
        return response.status >= 200 && response.status < 300
          ? response.json()
          : response.json().then(Promise.reject.bind(Promise));
      })
      .then(json => {
        this.setState({
          administrators: json.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleAddUser = newUser => {
    this.setState(prevState => ({
      administrators: [...prevState.administrators, newUser]
    }));
  };

  render() {
    const { administrators } = this.state;
    return (
      <>
        <Paper>
          <WorkersList workers={administrators} />
        </Paper>
        <CollapseForm
          tooltipText="Add Administrator"
          formTitle="Create New Administrator:"
        >
          <AddWorkerForm
            onAdd={this.handleAddUser}
            restId={this.props.restId}
            role={ROLES.ADMINISTRATOR}
          />
        </CollapseForm>
      </>
    );
  }
}

export default ManageAdministrators;
