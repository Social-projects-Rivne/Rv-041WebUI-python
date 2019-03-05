import React from "react";
import PropTypes from "prop-types";
import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Tooltip,
  TableSortLabel,
  withStyles
} from "@material-ui/core/";

const rows = [
  {
    id: "img",
    numeric: false,
    label: "Image"
  },
  { id: "name", numeric: false, label: "Name" },
  {
    id: "description",
    numeric: false,
    label: "Description"
  },
  {
    id: "ingredients",
    numeric: false,
    label: "Ingredients"
  },
  { id: "amount", numeric: true, label: "Value" },
  { id: "price", numeric: true, label: "Price($)" },
  {
    id: "category_id",
    numeric: true,
    label: "Category"
  }
];

const styles = theme => ({
  tableRow: {
    "& > *": {
      paddingRight: theme.spacing.unit,
      paddingLeft: theme.spacing.unit
    },
    "& > *:first-child": {
      paddingLeft: theme.spacing.unit * 3
    }
  }
});

class MenuHeader extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      classes
    } = this.props;

    return (
      <TableHead>
        <TableRow className={classes.tableRow}>
          <TableCell>
            <Checkbox
              style={{ width: 24, height: 24 }}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

export default withStyles(styles)(MenuHeader);

MenuHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};
