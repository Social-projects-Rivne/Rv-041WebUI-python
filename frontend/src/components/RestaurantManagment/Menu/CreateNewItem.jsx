import React from "react";

import {
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  TextField,
  Input,
  withStyles,
  CardMedia,
  Fab
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";

import CategorySelect from "./CategorySelect";

const styles = theme => ({
  media: {
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
    margin: "auto",
    marginLeft: 0,
    borderRadius: theme.spacing.unit / 2
  },
  tableRowEditable: {
    cursor: "pointer",
    "& > *": {
      paddingRight: theme.spacing.unit,
      paddingLeft: theme.spacing.unit
    },
    "& > *:first-child": {
      paddingLeft: theme.spacing.unit * 2
    }
  },
  editImg: {
    position: "relative"
  },
  imgInput: {
    position: "absolute",
    margin: "auto",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 48,
    height: 48
  }
});

class CreateNewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: "",
      imgBody: {},
      name: "",
      description: "",
      ingredients: "",
      value: 0,
      price: 0,
      category: ""
    };
  }

  _getInitialState = () => {
    const initialState = {
      img: "",
      imgBody: {},
      name: "",
      description: "",
      ingredients: "",
      value: 0,
      price: 0,
      category: ""
    };
    return initialState;
  };

  _resetState = () => {
    this.setState(this._getInitialState());
  };

  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value
    });
  };

  handleImageChange = e => {
    e.target.files[0] &&
      this.setState({
        imgBody: e.target.files[0],
        img: URL.createObjectURL(e.target.files[0])
      });
  };

  validate = () => {
    const {
      img,
      name,
      description,
      ingredients,
      value,
      price,
      category
    } = this.state;

    return img &&
      name &&
      description &&
      ingredients &&
      value &&
      price &&
      category
      ? true
      : false;
  };

  handleAddClick = () => {
    const restId = this.props.restId;
    const menuId = this.props.menuId || "draft";
    const imgage = this.state.imgBody;
    let formData = new FormData();
    formData.append("img", imgage);

    let { imgBody, img, ...data } = this.state;

    fetch("http://localhost:6543/api/file", {
      method: "POST",
      headers: {
        "x-auth-token": localStorage.getItem("token")
      },
      body: formData
    })
      .then(response => {
        return response.status >= 200 && response.status < 300
          ? response.json()
          : response.json().then(Promise.reject.bind(Promise));
      })
      .then(response => {
        data["image"] = response;
        fetch(`http://localhost:6543/api/restaurant/${restId}/menu/${menuId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify(data)
        })
          .then(response => {
            return response.status >= 200 && response.status < 300
              ? response.json()
              : response.json().then(Promise.reject.bind(Promise));
          })
          .then(response => {
            this.props.onMenuItemAdd(response.data);
          })
          .then(response => {
            this._resetState();
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { classes } = this.props;
    const { img, name, description, ingredients, value, price } = this.state;

    return (
      <TableBody onChange={this.handleChange}>
        <TableRow className={classes.tableRowEditable} tabIndex={-1}>
          <TableCell>
            <Fab
              disabled={!this.validate()}
              onClick={this.handleAddClick}
              size="small"
              color="primary"
            >
              <AddIcon />
            </Fab>
          </TableCell>
          <TableCell className={classes.editImg} align="center">
            <CardMedia
              className={classes.media}
              image={img ? img : "placeholder"}
            />
            <div className={classes.imgInput}>
              <input
                onChange={this.handleImageChange}
                accept="image/*"
                name="imgPath"
                style={{ display: "none" }}
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <IconButton color="primary" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
          </TableCell>
          <TableCell>
            <TextField
              name="name"
              value={name}
              multiline
              rowsMax="3"
              fullWidth
            />
          </TableCell>
          <TableCell>
            <TextField
              name="description"
              value={description}
              multiline
              rowsMax="3"
              fullWidth
            />
          </TableCell>
          <TableCell>
            <TextField
              name="ingredients"
              value={ingredients}
              multiline
              rowsMax="3"
              fullWidth
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              type="number"
              name="value"
              value={value}
              inputProps={{
                min: 0,
                step: 0.1
              }}
              fullWidth
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              name="price"
              value={price}
              type="number"
              fullWidth
              inputProps={{
                min: 0,
                step: 0.1
              }}
            />
          </TableCell>
          <TableCell align="right">
            <CategorySelect
              input={
                <Input
                  inputProps={{
                    style: { fontSize: "0.8125rem" }
                  }}
                />
              }
            />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
}

export default withStyles(styles)(CreateNewItem);
