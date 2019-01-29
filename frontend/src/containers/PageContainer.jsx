import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      paddingTop: theme.spacing.unit * 4,
      paddingBottom: theme.spacing.unit * 4
    }
  },
  small: {
    maxWidth: theme.breakpoints.values.sm
  },
  medium: {
    width: "auto",
    [theme.breakpoints.up("lg")]: {
      width: theme.breakpoints.values.lg
    }
  },
  fullWidth: {
    width: "100%",
    paddingLeft: 0,
    paddingRight: 0,
    [theme.breakpoints.up("sm")]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  fullHeight: {
    paddingTop: 0,
    paddingBottom: 0,
    display: "flex",
    flexWrap: "wrap",
    height: `calc(100vh - ${theme.spacing.unit * 8}px)`
  },
  noPadding: {
    paddingTop: 0,
    paddingBottom: 0
  }
});

const PageContainer = props => {
  const {
    children,
    classes,
    className,
    fullHeight,
    fullWidth,
    noPadding,
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
          [classes.fullHeight]: fullHeight,
          [classes.fullWidth]: fullWidth,
          [classes.noPadding]: noPadding
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
  noPadding: PropTypes.bool,
  style: PropTypes.object,
  width: PropTypes.oneOf(["small", "medium", "full"])
};

PageContainer.defaultProps = {
  fullHeight: false,
  fullWidth: false,
  width: "medium",
  noPadding: false
};

export default withStyles(styles)(PageContainer);
