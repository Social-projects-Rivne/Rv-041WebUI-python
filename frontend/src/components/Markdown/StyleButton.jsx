import React from "react";
import { IconButton, withStyles, Tooltip } from "@material-ui/core";
import classnames from "classnames";

const styles = theme => ({
  styleBtn: { margin: theme.spacing.unit / 2 },
  styleSelect: {
    background: theme.palette.action.selected
  }
});

const StyleButton = props => {
  const { classes } = props;

  const onToggle = e => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  return (
    <Tooltip title={props.label} placement="top">
      <IconButton
        size="small"
        className={classnames(classes.styleBtn, {
          [classes.styleSelect]: props.active
        })}
        onMouseDown={onToggle}
      >
        {props.icon || props.label}
      </IconButton>
    </Tooltip>
  );
};

export default withStyles(styles)(StyleButton);
