import React from "react";

import {
  NativeSelect,
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
      value: 0,
      price: 0
    };
    this.imgAddRef = React.createRef();
  }

  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleImageChange = e => {
    e.target.files[0] &&
      this.setState({
        img: URL.createObjectURL(e.target.files[0])
      });
  };

  validate = () => {
    const { img, name, description, ingredients, value, price } = this.state;

    return img && name && description && ingredients && value && price
      ? true
      : false;
  };

  render() {
    const { classes } = this.props;
    const { img, name, description, ingredients, value, price } = this.state;
    return (
      <TableBody onChange={this.handleChange}>
        <TableRow className={classes.tableRowEditable} tabIndex={-1}>
          <TableCell>
            <Fab disabled={!this.validate()} size="small" color="primary">
              <AddIcon />
            </Fab>
          </TableCell>
          <TableCell className={classes.editImg} align="center">
            <CardMedia className={classes.media} image={img} />
            <div className={classes.imgInput}>
              <input
                onChange={this.handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
                id="icon-button-file"
                type="file"
                ref={this.imgAddRef}
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
                    style: { fontSize: "0.8125rem" },
                    ref: this.categoryRef
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
