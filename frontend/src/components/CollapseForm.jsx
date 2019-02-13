import React from "react";
import PropTypes from "prop-types";
import AddIcon from "@material-ui/icons/Add";
import {
  Fab,
  withStyles,
  Typography,
  Collapse,
  Card,
  CardContent,
  Tooltip,
  CardHeader,
  Divider,
  Snackbar
} from "@material-ui/core";
import classnames from "classnames";
import SnackbarContent from "./SnackbarContent";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    padding: `${theme.spacing.unit * 2}px 0`
  },
  fab: {
    transform: "scale(1)",
    transition: theme.transitions.create("transform")
  },
  fabDisabled: {
    transform: "scale(0)"
  }
});

class CollapseForm extends React.Component {
  state = {
    formExpanded: false,
    snackbarOpen: false,
    success: false,
    snackbarMsg: ""
  };

  handleExpandFormClick = () => {
    this.setState({
      formExpanded: true
    });
  };

  handleCloseFormClick = () => {
    this.setState({
      formExpanded: false
    });
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  handleSuccesEvent = (succes, msg) => {
    this.setState({
      snackbarOpen: true,
      success: succes,
      snackbarMsg: msg
    });
  };

  render() {
    const {
      classes,
      children,
      tooltipText,
      formTitle,
      tooltipIcon
    } = this.props;
    const { formExpanded, success, snackbarMsg, snackbarOpen } = this.state;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        handleCloseFormClick: this.handleCloseFormClick,
        handleSuccesEvent: this.handleSuccesEvent
      })
    );

    return (
      <>
        <div className={classes.root}>
          <Tooltip title={tooltipText} placement="left">
            <Fab
              className={classnames(classes.fab, {
                [classes.fabDisabled]: formExpanded
              })}
              onClick={this.handleExpandFormClick}
              aria-expanded={formExpanded}
              aria-label="Show more"
              color="primary"
              disabled={formExpanded}
            >
              {tooltipIcon}
            </Fab>
          </Tooltip>
        </div>
        <Collapse in={formExpanded} timeout="auto" unmountOnExit>
          <Card>
            {formTitle && (
              <CardHeader
                title={<Typography variant="h6">{formTitle}</Typography>}
              />
            )}
            {formTitle && <Divider />}
            <CardContent>{childrenWithProps}</CardContent>
          </Card>
        </Collapse>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={snackbarOpen}
          autoHideDuration={success ? 3000 : null}
          onClose={this.handleSnackbarClose}
        >
          <SnackbarContent
            onClose={this.handleSnackbarClose}
            variant={success ? "success" : "error"}
            message={
              <Typography color="inherit" align="center">
                {snackbarMsg || success || "Something went wrong"}
              </Typography>
            }
          />
        </Snackbar>
      </>
    );
  }
}

CollapseForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  classes: PropTypes.object,
  tooltipText: PropTypes.string,
  formTitle: PropTypes.string
};

CollapseForm.defaultProps = {
  tooltipText: "Add",
  tooltipIcon: <AddIcon />
};

export default withStyles(styles)(CollapseForm);
