import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import { green, amber } from "@material-ui/core/colors/";
import {
  Fab,
  withStyles,
  Typography,
  Collapse,
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
  Select,
  ListItemText,
  MenuItem,
  Input,
  Checkbox,
  InputLabel,
  FormControl,
  Snackbar,
  Tooltip,
  CardHeader,
  Divider
} from "@material-ui/core";
import TagSelect from "./TagSelect";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250
    }
  }
};

export class UpdateRestaurantForm extends React.Component {
  state = {
    newRestaurant: {
      name: "",
      address: "",
      phone: "",
      description: "",
      tags: []
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
    }).then(response => {
      return response.status >= 200 && response.status < 300
        ? response.json()
        : response.json().then(Promise.reject.bind(Promise));
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

  handleTagsChange = event => {
    let value = event.target.value;
    let name = event.target.name;

    this.setState(prevState => ({
      newRestaurant: { ...prevState.newRestaurant, [name]: value }
    }));
  };

  render() {
    const { allTags, newRestaurant } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        onChange={this.handleFormChange}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={16} justify="space-between">
          <Grid item xs={12}>
            <TextField
              value={newRestaurant.name}
              required
              name="name"
              label="Restaurant Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={newRestaurant.address}
              required
              name="address"
              label="Restaurant Address"
              fullWidth
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
              multiline
              rows="4"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TagSelect
              tags={newRestaurant.tags}
              allTags={allTags}
              onTagsChange={this.handleTagsChange}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              onClick={this.handleCloseFormClick}
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
      </form>
    );
  }
}

export default UpdateRestaurantForm;
