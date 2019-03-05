import React from "react";
import { ROLES } from "../../Service/constants";

import { Paper, Typography } from "@material-ui/core";

import WorkersList from "../../components/RestaurantManagment/WorkersList";
import CollapseForm from "../../components/CollapseForm";
import AddWorkerForm from "../../components/RestaurantManagment/AddWorkerForm";

class ManageWaiters extends React.Component {
  state = {
    waiters: []
  };

  componentDidMount() {
    const restId = this.props.restId;
    fetch(`http://localhost:6543/api/workers/${restId}/${ROLES.WAITER}`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    })
      .then(response => {
        return response.status >= 200 && response.status < 300
          ? response.json()
          : response.json().then(Promise.reject.bind(Promise));
      })
      .then(json => {
        console.log(json);
        this.setState({
          waiters: json.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleAddUser = newUser => {
    this.setState(prevState => ({
      waiters: [...prevState.waiters, newUser]
    }));
  };

  handleDeleteUser = id => {
    fetch(`http://localhost:6543/api/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      }
    })
      .then(response => {
        return response.status >= 200 && response.status < 300
          ? response.json()
          : response.json().then(Promise.reject.bind(Promise));
      })
      .then(json => {
        this.setState(prevState => ({
          waiters: prevState.waiters.filter(item => item.id !== id)
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { waiters } = this.state;
    return (
      <>
        <Paper>
          {waiters.length > 0 ? (
            <WorkersList onDelete={this.handleDeleteUser} workers={waiters} />
          ) : (
            <Typography style={{ padding: 16 }} variant="subtitle2">
              Create your worker:
            </Typography>
          )}
        </Paper>
        <CollapseForm tooltipText="Add Waiter" formTitle="Create New Waiter:">
          <AddWorkerForm
            onAdd={this.handleAddUser}
            restId={this.props.restId}
            role={ROLES.WAITER}
          />
        </CollapseForm>
      </>
    );
  }
}

export default ManageWaiters;
