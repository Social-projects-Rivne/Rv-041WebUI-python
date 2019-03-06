import React from "react";
import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel
} from "@material-ui/core";
import ListSelect from "../../ListSelect";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
import MarkdownEditor from "../../Markdown/MarkdownEditor";

export class UpdateRestaurantForm extends React.Component {
  state = {
    updatedRestaurant: {
      name: "",
      address: "",
      phone: "",
      description: "",
      tags: []
    },
    editorState: EditorState.createEmpty(),
    allTags: []
  };

  componentDidMount() {
    const { info } = this.props;

    this.setState({
      updatedRestaurant: {
        name: info.name,
        phone: info.phone,
        address: info.address_id,
        description: info.description,
        tags: info.tags ? info.tags.map(tag => tag.name) : []
      },
      editorState: EditorState.createWithContent(
        convertFromRaw(JSON.parse(info.description_markup))
      )
    });

    fetch("http://localhost:6543/api/tag")
      .then(response => response.json())
      .then(tags => this.setState({ allTags: tags.data }));
  }

  handleSubmit = e => {
    e.preventDefault();

    const { updatedRestaurant, editorState } = this.state;
    const contentState = convertToRaw(editorState.getCurrentContent());
    updatedRestaurant.markup = JSON.stringify(contentState);

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

  onEditorChange = editorState => {
    this.setState({ editorState });
  };

  toggleEditorBlockType = blockType => {
    this.onEditorChange(
      RichUtils.toggleBlockType(this.state.editorState, blockType)
    );
  };

  toggleEditorInlineStyle = inlineStyle => {
    this.onEditorChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  render() {
    const { allTags, updatedRestaurant, editorState } = this.state;
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
              label="Prewiev text"
              multiline
              rows="4"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12}>
            <MarkdownEditor
              ref="editor"
              editorState={editorState}
              toggleInlineStyle={this.toggleEditorInlineStyle}
              toggleBlockType={this.toggleEditorBlockType}
              onChange={this.onEditorChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="tags">Tags</InputLabel>
              <ListSelect
                name="tags"
                selectedItems={updatedRestaurant.tags}
                list={allTags}
                onListChange={this.handleTagsChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Button
              onClick={this.props.handleCloseFormClick}
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
