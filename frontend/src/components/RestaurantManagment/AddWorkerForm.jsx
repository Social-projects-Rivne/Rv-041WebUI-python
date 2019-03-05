import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Grid, Button } from "@material-ui/core";

export class AddWorkerForm extends React.Component {
  state = {
    newUser: {
      name: "",
      email: "",
      password: "",
      phone_number: "",
      birth_date: new Date()
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { newUser } = this.state;
    const role = this.props.role;
    fetch(`http://localhost:6543/api/user/${role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify(newUser)
    })
      .then(response => {
        return response.status >= 200 &&
          response.status < 300 &&
          response.json().status
          ? response.json()
          : response.json().then(Promise.reject.bind(Promise));
      })
      .then(newUser => {
        this.props.handleSuccesEvent(newUser.success, newUser.message);
        this.props.onAdd(newUser.data[0]);
        this.clearForm();
      })
      .catch(err => {
        this.props.handleSuccesEvent(err.success, err.error);
      });
  };

  handleFormChange = event => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState(prevState => ({
      newUser: {
        ...prevState.newUser,
        [name]: value
      }
    }));
  };

  clearForm = () => {
    this.setState({
      newUser: {
        name: "",
        email: "",
        password: "",
        phone_number: "",
        birth_date: new Date()
      }
    });
  };

  render() {
    const { newUser } = this.state;
    const { handleCloseFormClick } = this.props;

    newUser["restaurant_id"] = this.props.restId;

    return (
      <ValidatorForm
        onSubmit={this.handleSubmit}
        onChange={this.handleFormChange}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={16} justify="space-between">
          <Grid item xs={12}>
            <TextValidator
              value={newUser.name}
              required
              name="name"
              label="Name"
              fullWidth
              validators={["required"]}
              errorMessages={["Name is required"]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              value={newUser.email}
              required
              name="email"
              label="Mail"
              fullWidth
              validators={["required"]}
              errorMessages={["Mail is required"]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              value={newUser.password}
              required
              name="password"
              label="Password"
              fullWidth
              validators={["required"]}
              errorMessages={["Password is required"]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              value={newUser.phone_number}
              required
              name="phone_number"
              label="Phone number"
              fullWidth
              validators={["required"]}
              errorMessages={["Phone number is required"]}
            />
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={3}>
            <Button
              onClick={handleCloseFormClick}
              variant="contained"
              color="secondary"
              fullWidth
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={this.handleFormSubmit}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    );
  }
}

export default AddWorkerForm;
