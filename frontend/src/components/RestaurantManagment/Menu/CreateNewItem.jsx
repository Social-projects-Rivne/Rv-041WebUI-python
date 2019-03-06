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
      name: "",
      description: "",
      ingredients: "",
      amount: 0,
      price: 0,
      category: {},
      category_id: "",
      file: null,
      imgBlob: ""
    };
  }

  _getInitialState = () => {
    const initialState = {
      img: "",
      name: "",
      description: "",
      ingredients: "",
      amount: 0,
      price: 0,
      category: {},
      category_id: "",
      file: null,
      imgBlob: ""
    };
    return initialState;
  };

  _counter = 0;

  _resetState = () => {
    this.setState(this._getInitialState());
  };

  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "category") {
      let categoryName = e.target.querySelector(`[value="${value}"]`).label;
      this.setState({
        category_id: value,
        category: { id: value, name: categoryName }
      });
    } else if (name !== "imgCreateItem") {
      this.setState({
        [name]: value
      });
    }
  };

  handleImageChange = e => {
    e.target.files[0] &&
      this.setState({
        file: e.target.files[0],
        imgBlob: URL.createObjectURL(e.target.files[0])
      });
  };

  validate = () => {
    const {
      file,
      name,
      description,
      ingredients,
      amount,
      price,
      category,
      category_id
    } = this.state;

    return file &&
      name &&
      description &&
      ingredients &&
      amount &&
      price &&
      category &&
      category_id
      ? true
      : false;
  };

  handleAddClick = () => {
    const restId = this.props.restId;
    const menuId = this.props.menuId;
    const img = this.state.file;
    let formData = new FormData();
    formData.append("img", img);

    let { file, imgBlob, ...data } = this.state;

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
        data["img"] = response;
        data["price"] = this.state.price * 100;
        if (menuId !== "create_menu") {
          fetch(
            `http://localhost:6543/api/restaurant/${restId}/menu/${menuId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
              },
              body: JSON.stringify(data)
            }
          )
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
              var select = document.querySelector(`[name="category"]`);
              select.value = "";
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          data["id"] = this._counter++;
          this.props.onMenuItemAdd(data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { classes } = this.props;
    const {
      name,
      description,
      ingredients,
      amount,
      price,
      imgBlob
    } = this.state;

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
              image={imgBlob ? imgBlob : "placeholder"}
            />
            <div className={classes.imgInput}>
              <input
                onChange={this.handleImageChange}
                accept="image/*"
                name="imgCreateItem"
                style={{ display: "none" }}
                id="add-item"
                type="file"
              />
              <label htmlFor="add-item">
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
              name="amount"
              value={amount}
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
