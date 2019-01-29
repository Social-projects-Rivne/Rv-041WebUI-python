import React from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import TagSelect from "./TagSelect";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export class UpdateRestaurantForm extends React.Component {
  state = {
    updatedRestaurant: {
      name: "",
      address: "",
      phone: "",
      description: "",
      tags: []
    },
    allTags: []
  };

  componentDidMount() {
    const { restInfo } = this.props;

    this.setState({
      updatedRestaurant: {
        name: restInfo.name,
        phone: restInfo.phone,
        address: restInfo.address_id,
        description: restInfo.description,
        tags: restInfo.tags ? restInfo.tags.map(tag => tag.name) : []
      }
    });

    fetch("http://localhost:6543/api/tag")
      .then(response => response.json())
      .then(tags => this.setState({ allTags: tags.data }));
  }

  handleSubmit = e => {
    e.preventDefault();

    const { updatedRestaurant } = this.state;

    fetch(`http://localhost:6543/api/user_restaurant/${this.props.restId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify(updatedRestaurant)
    })
      .then(response => {
        return response.status >= 200 && response.status < 300
          ? response.json()
          : response.json().then(Promise.reject.bind(Promise));
      })
      .then(updatedRestaurant => {
        this.props.handleSuccesEvent(
          updatedRestaurant.success,
          updatedRestaurant.message
        );
        this.props.onUpdate(updatedRestaurant.data);
      })
      .catch(err => {
        this.props.handleSuccesEvent(err.success, err.message);
      });
  };

  handleFormChange = event => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState(prevState => ({
      updatedRestaurant: {
        ...prevState.updatedRestaurant,
        [name]: value
      }
    }));
  };

  handleTagsChange = event => {
    let value = event.target.value;
    let name = event.target.name;

    this.setState(prevState => ({
      updatedRestaurant: { ...prevState.updatedRestaurant, [name]: value }
    }));
  };

  render() {
    const { allTags, updatedRestaurant } = this.state;
    const { handleCloseFormClick } = this.props;

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
              value={updatedRestaurant.name}
              name="name"
              label="Restaurant Name"
              required
              fullWidth
              validators={["required"]}
              errorMessages={["Restaurant name cannot be empty"]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              value={updatedRestaurant.address}
              name="address"
              label="Restaurant Address"
              required
              fullWidth
              validators={["required"]}
              errorMessages={["Restaurant address cannot be empty"]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={updatedRestaurant.phone}
              name="phone"
              label="Restaurant Phone"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={updatedRestaurant.description}
              name="description"
              label="Restaurant Description"
              multiline
              rows="4"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TagSelect
              tags={updatedRestaurant.tags}
              allTags={allTags}
              onTagsChange={this.handleTagsChange}
            />
          </Grid>
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
              Update
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    );
  }
}

export default UpdateRestaurantForm;
