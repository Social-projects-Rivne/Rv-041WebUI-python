import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import {
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  withStyles
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { MoreVert } from "@material-ui/icons";

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center"
  },
  title: {
    flex: "0 0 auto"
  }
});

class MenuToolbar extends React.Component {
  render() {
    const { numSelected, classes, menuName } = this.props;
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle">
              {menuName}
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 && (
            <>
              <Tooltip title="Delete">
                <IconButton aria-label="Delete">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Filter list">
                <IconButton size="small" aria-label="Filter list">
                  <FilterListIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title="Action">
            <IconButton aria-label="Action">
              <MoreVert />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    );
  }
}

MenuToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number,
  menuName: PropTypes.string.isRequired
};

export default withStyles(toolbarStyles)(MenuToolbar);
