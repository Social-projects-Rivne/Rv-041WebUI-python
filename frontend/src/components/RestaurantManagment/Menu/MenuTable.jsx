import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
  Paper,
  Checkbox,
  CardMedia,
  Divider,
  IconButton,
  TextField,
  Input
} from "@material-ui/core/";
import IconDelete from "@material-ui/icons/Delete";
import IconEdit from "@material-ui/icons/Edit";
import IconSave from "@material-ui/icons/Save";
import { PhotoCamera } from "@material-ui/icons";

import MenuHeader from "./MenuHeader";
import MenuToolbar from "./MenuToolbar";
import CategorySelect from "./CategorySelect";
import CreateNewItem from "./CreateNewItem";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

function formatPrice(value) {
  return Number(value / 100)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

const styles = theme => ({
  root: {
    width: "100%"
  },
  table: {
    // minWidth: 1232,
    tableLayout: "fixed"
  },
  media: {
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
    margin: "auto",
    marginLeft: 0,
    borderRadius: theme.spacing.unit / 2
  },
  editMedia: {
    filter: "blur(3px)"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  tableRow: {
    cursor: "pointer",
    "& > *": {
      paddingRight: theme.spacing.unit,
      paddingLeft: theme.spacing.unit
    },
    "& > *:first-child": {
      paddingLeft: theme.spacing.unit * 3
    }
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
  tableRowHover: {
    position: "relative",
    "&:hover $actions": {
      display: "table-cell"
    },
    "&:hover $hideOnHover": {
      display: "none"
    }
  },
  actions: {
    display: "none"
  },
  actionsBtns: {
    display: "flex"
  },
  hideOnHover: {
    display: "table-cell"
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

class MenuTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "name",
      selected: [],
      page: 0,
      rowsPerPage: 10,
      editableRows: [],
      imgBody: {},
      img: ""
    };
    this.nameRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.ingredientsRef = React.createRef();
    this.valueRef = React.createRef();
    this.priceRef = React.createRef();
    this.categoryRef = React.createRef();
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({
        selected: this.props.menuItems.map(item => item.id)
      }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleEditClick = (event, id) => {
    event.stopPropagation();

    this.setState(prevState => ({
      editableRows: [...prevState.editableRows, id]
    }));
  };

  handleImageChange = e => {
    e.target.files[0] &&
      this.setState({
        imgBody: e.target.files[0],
        img: URL.createObjectURL(e.target.files[0])
      });
  };

  handleSaveClick = (event, id) => {
    const restId = this.props.restId;
    const menuId = this.props.match.params.id;

    const name = this.nameRef.current.value;
    const description = this.descriptionRef.current.value;
    const ingredients = this.ingredientsRef.current.value;
    const value = this.valueRef.current.value;
    const price = this.priceRef.current.value;
    const category = this.categoryRef.current.value;

    const img = this.state.imgBody;
    let formData = new FormData();
    formData.append("img", img);

    let data = { name, description, ingredients, value, price, category };
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
        fetch(
          `http://localhost:6543/api/restaurant/${restId}/menu/${menuId}/item/${id}`,
          {
            method: "PUT",
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
            console.log(response.data);
            this.props.onUpdateItem(response.data);
          })
          .then(response => {
            this.setState(prevState => ({
              editableRows: [
                prevState.editableRows.filter(item => item.id !== id)
              ]
            }));
          })
          .catch(err => {
            this.setState(prevState => ({
              editableRows: [prevState.editableRows]
            }));
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { classes, menuItems, menuName, restId } = this.props;
    const {
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      editableRows
    } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, menuItems.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <MenuToolbar menuName={menuName} numSelected={selected.length} />
        <Divider />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <colgroup>
              <col style={{ width: "56px" }} />
              <col style={{ width: "64px" }} />
              <col style={{ maxWidth: "200px" }} />
              <col style={{ maxWidth: "316px" }} />
              <col style={{ maxWidth: "324px" }} />
              <col style={{ width: "80px" }} />
              <col style={{ width: "80px" }} />
              <col style={{ width: "102px" }} />
            </colgroup>
            <MenuHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={menuItems.length}
            />
            <CreateNewItem
              restId={restId}
              menuId={this.props.match.params.id}
              onMenuItemAdd={this.props.onMenuItemAdd}
            />
            <TableBody>
              {stableSort(menuItems, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(item => {
                  const isSelected = this.isSelected(item.id);
                  return editableRows.includes(item.id) ? (
                    <TableRow
                      className={classes.tableRowEditable}
                      tabIndex={-1}
                      key={item.id}
                    >
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={event =>
                            this.handleSaveClick(event, item.id)
                          }
                          style={{ padding: 8 }}
                        >
                          <IconSave />
                        </IconButton>
                      </TableCell>
                      <TableCell className={classes.editImg} align="center">
                        <CardMedia
                          className={classnames(
                            classes.media,
                            classes.editMedia
                          )}
                          image={item.img}
                          title={item.name}
                        />
                        <div className={classes.imgInput}>
                          <input
                            onChange={this.handleImageChange}
                            accept="image/*"
                            style={{ display: "none" }}
                            id="icon-edit-file"
                            type="file"
                          />
                          <label htmlFor="icon-edit-file">
                            <IconButton color="primary" component="span">
                              <PhotoCamera />
                            </IconButton>
                          </label>
                        </div>
                      </TableCell>
                      <TableCell>
                        <TextField
                          multiline
                          rows="3"
                          inputProps={{
                            style: { fontSize: "0.8125rem" },
                            ref: this.nameRef
                          }}
                          fullWidth
                          defaultValue={item.name}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          multiline
                          rows="3"
                          inputProps={{
                            style: { fontSize: "0.8125rem" },
                            ref: this.descriptionRef
                          }}
                          fullWidth
                          defaultValue={item.description}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          multiline
                          rows="3"
                          fullWidth
                          inputProps={{
                            style: { fontSize: "0.8125rem" },
                            ref: this.ingredientsRef
                          }}
                          defaultValue={item.ingredients}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          inputProps={{
                            style: { fontSize: "0.8125rem" },
                            ref: this.valueRef,
                            min: 0,
                            step: 0.1
                          }}
                          fullWidth
                          defaultValue={item.amount}
                        />
                      </TableCell>
                      <TableCell className={classes.hide} align="right">
                        <TextField
                          type="number"
                          fullWidth
                          inputProps={{
                            style: { fontSize: "0.8125rem" },
                            ref: this.priceRef,
                            min: 0,
                            step: 0.1
                          }}
                          defaultValue={formatPrice(item.price)}
                        />
                      </TableCell>
                      <TableCell className={classes.actions}>
                        <div className={classes.actionsBtns}>
                          <IconButton color="primary">
                            <IconDelete fontSize="small" />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={event =>
                              this.handleEditClick(event, item.id)
                            }
                          >
                            <IconEdit fontSize="small" />
                          </IconButton>
                        </div>
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
                          currentCategory={item.category.id}
                        />
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, item.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={item.id}
                      selected={isSelected}
                      className={classnames(
                        classes.tableRow,
                        classes.tableRowHover
                      )}
                    >
                      <TableCell>
                        <Checkbox
                          style={{ width: 24, height: 24 }}
                          checked={isSelected}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <CardMedia
                          className={classes.media}
                          image={item.img}
                          title={item.name}
                        />
                      </TableCell>
                      <Typography
                        variant="inherit"
                        noWrap
                        component={TableCell}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="inherit"
                        noWrap
                        component={TableCell}
                      >
                        {item.description}
                      </Typography>
                      <Typography
                        variant="inherit"
                        noWrap
                        component={TableCell}
                      >
                        {item.ingredients}
                      </Typography>
                      <TableCell align="right">{item.amount}</TableCell>
                      <TableCell className={classes.hide} align="right">
                        {formatPrice(item.price)}
                      </TableCell>
                      <TableCell className={classes.actions}>
                        <div className={classes.actionsBtns}>
                          <IconButton>
                            <IconDelete fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={event =>
                              this.handleEditClick(event, item.id)
                            }
                          >
                            <IconEdit fontSize="small" />
                          </IconButton>
                        </div>
                      </TableCell>
                      <TableCell className={classes.hideOnHover} align="right">
                        {item.category.name}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={menuItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

MenuTable.propTypes = {
  classes: PropTypes.object.isRequired,
  menuName: PropTypes.string.isRequired
};

export default withStyles(styles)(MenuTable);
