import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel
} from "@material-ui/core";
import ListSelect from "../ListSelect";
import MarkdownEditor from "../Markdown/MarkdownEditor";

export class AddRestaurantForm extends React.Component {
  state = {
    newRestaurant: {
      name: "",
      address: "",
      phone: "",
      description: "",
      tags: [],
      markup: {}
    },
    allTags: []
  };

  componentDidMount() {
    fetch("http://localhost:6543/api/tag")
      .then(response => response.json())
      .then(tags => this.setState({ allTags: tags.data }));
  }

  handleSubmit = e => {
    e.preventDefault();
    const { newRestaurant } = this.state;
    fetch("http://localhost:6543/api/user_restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify(newRestaurant)
    })
      .then(response => {
        return response.status >= 200 && response.status < 300
          ? response.json()
          : response.json().then(Promise.reject.bind(Promise));
      })
      .then(newRestaurant => {
        this.props.handleSuccesEvent(
          newRestaurant.success,
          newRestaurant.message
        );
        this.props.onAdd(newRestaurant.data);
        localStorage.setItem("role", "Owner");
        this.props.ctx.changeState({ role: "Owner" });
        this.clearForm();
      })
      .catch(err => {
        this.props.handleSuccesEvent(err.success, err.message);
      });
  };

  handleFormChange = event => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState(prevState => ({
      newRestaurant: {
        ...prevState.newRestaurant,
        [name]: value
      }
    }));
  };

  clearForm = () => {
    this.setState({
      newRestaurant: {
        name: "",
        address: "",
        phone: "",
        description: "",
        tags: []
      }
    });
  };

  handleTagsChange = event => {
    let value = event.target.value;
    let name = event.target.name;

    this.setState(prevState => ({
      newRestaurant: { ...prevState.newRestaurant, [name]: value }
    }));
  };

  handleMarkupChange = content => {
    this.setState(prevState => ({
      newRestaurant: {
        ...prevState.newRestaurant,
        markup: JSON.stringify(content)
      }
    }));
  };

  render() {
    const { allTags, newRestaurant } = this.state;
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
              value={newRestaurant.name}
              required
              name="name"
              label="Restaurant Name"
              fullWidth
              validators={["required"]}
              errorMessages={["Name is required"]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              value={newRestaurant.address}
              required
              name="address"
              label="Restaurant Address"
              fullWidth
              validators={["required"]}
              errorMessages={["Address is required"]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={newRestaurant.phone}
              name="phone"
              label="Restaurant Phone"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={newRestaurant.description}
              name="description"
              label="Restaurant Description"
              fullWidth
              multiline
              rows="4"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="tags">Tags</InputLabel>
              <ListSelect
                name="tags"
                selectedItems={newRestaurant.tags}
                list={allTags}
                onListChange={this.handleTagsChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <MarkdownEditor onMarkupChange={this.handleMarkupChange} />
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
              Add
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    );
  }
}

export default AddRestaurantForm;
