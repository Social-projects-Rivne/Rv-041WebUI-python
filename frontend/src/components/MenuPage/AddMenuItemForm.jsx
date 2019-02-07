import React from "react";
import {
  ValidatorForm,
  TextValidator,
  SelectValidator
} from "react-material-ui-form-validator";
import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel
} from "@material-ui/core";
import ListSelect from "../ListSelect";

export class AddMenuItemForm extends React.Component {
  state = {
    newMenuItem: {
      name: "",
      description: "",
      ingredients: "",
      img: "",
      category: []
    },
    allCategories: []
  };

  componentDidMount() {
    fetch("http://localhost:6543/api/categories")
      .then(response => response.json())
      .then(categories => this.setState({ allCategories: categories.data }));
  }

  handleSubmit = e => {
    e.preventDefault();
    const { newMenuItem } = this.state;
    const { menuId, restId } = this.props.params;

    fetch(`http://localhost:6543/api/restaurant/${restId}/menu/${menuId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify(newMenuItem)
    })
      .then(response => {
        return response.status >= 200 && response.status < 300
          ? response.json()
          : response.json().then(Promise.reject.bind(Promise));
      })
      .then(newMenuItem => {
        this.props.onAddItem(newMenuItem.data);
      })
      .catch(err => {
        this.props.handleSuccesEvent(err.success, err.message);
      });
  };

  handleFormChange = event => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState(prevState => ({
      newMenuItem: {
        ...prevState.newMenuItem,
        [name]: value
      }
    }));
  };

  // clearForm = () => {
  //   this.setState({
  //     newRestaurant: {
  //       name: "",
  //       address: "",
  //       phone: "",
  //       description: "",
  //       tags: []
  //     }
  //   });
  // };

  handleCategoriesChange = event => {
    let value = event.target.value;
    let name = event.target.name;
    this.setState(prevState => ({
      newMenuItem: { ...prevState.newMenuItem, [name]: value }
    }));
  };

  render() {
    const { allCategories, newMenuItem } = this.state;
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
              value={newMenuItem.name}
              name="name"
              label="Item Name"
              fullWidth
              required
              validators={["required"]}
              errorMessages={["Name is required"]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={newMenuItem.description}
              name="description"
              label="Item Description"
              multiline
              rows="3"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              value={newMenuItem.ingredients}
              name="ingredients"
              label="Item Ingredients"
              multiline
              rows="3"
              fullWidth
              required
              validators={["required"]}
              errorMessages={["Ingredients is required"]}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="category">Category</InputLabel>
              <ListSelect
                radio
                name="category"
                selectedItems={newMenuItem.category}
                list={allCategories}
                onListChange={this.handleCategoriesChange}
              />
            </FormControl>
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
              Create
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    );
  }
}

export default AddMenuItemForm;
