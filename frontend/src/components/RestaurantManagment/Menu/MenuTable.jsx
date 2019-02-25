import React from "react";
import PropTypes from "prop-types";

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
  IconButton
} from "@material-ui/core/";
import IconDelete from "@material-ui/icons/Delete";
import IconEdit from "@material-ui/icons/Edit";

import MenuHeader from "./MenuHeader";
import MenuToolbar from "./MenuToolbar";

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

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
  tableWrapper: {
    overflowX: "auto"
  },
  tableRow: {
    position: "relative",
    cursor: "pointer",
    "& > *": {
      paddingRight: theme.spacing.unit,
      paddingLeft: theme.spacing.unit
    },
    "& > *:first-child": {
      paddingLeft: theme.spacing.unit * 3
    },
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
  }
});

class MenuTable extends React.Component {
  state = {
    order: "asc",
    orderBy: "name",
    selected: [],
    page: 0,
    rowsPerPage: 10
  };

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
        selected: this.props.menu.map(item => item.id)
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

  render() {
    const { classes, menuItems, menuName } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
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
              <col style={{ width: "200px" }} />
              <col style={{ width: "316px" }} />
              <col style={{ width: "324px" }} />
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
            <TableBody>
              {stableSort(menuItems, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(item => {
                  const isSelected = this.isSelected(item.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, item.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={item.id}
                      selected={isSelected}
                      className={classes.tableRow}
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
                          <IconButton>
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
