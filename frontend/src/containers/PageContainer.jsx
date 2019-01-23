import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardHeader } from "@material-ui/core";

const styles = theme => ({
  small: {
    maxWidth: theme.breakpoints.values.sm,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3
    }
  },
  medium: {
    width: "auto",
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3
    },
    [theme.breakpoints.up("lg")]: {
      width: theme.breakpoints.values.lg
    }
  },
  widthFull: {
    width: "100%"
  },
  fullHeight: {
    height: "100%"
  }
});

const PageContainer = props => {
  const {
    children,
    classes,
    className,
    fullHeight,
    fullWidth,
    style,
    width,
    ...other
  } = props;

  return (
    <main
      className={classNames(
        classes.root,
        {
          [classes[width]]: !fullWidth,
          [classes.fullHeight]: fullHeight
        },
        className
      )}
      style={style}
      {...other}
    >
      {children}
    </main>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  style: PropTypes.object,
  width: PropTypes.oneOf(["small", "medium", "full"])
};

PageContainer.defaultProps = {
  fullHeight: false,
  fullWidth: false,
  width: "medium"
};

export default withStyles(styles)(PageContainer);
