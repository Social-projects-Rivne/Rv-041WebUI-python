import React from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  Fab,
  withStyles,
  Typography,
  Collapse,
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";

const styles = theme => ({
  root: {},
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.unit * 2,
  },
});

class AddRestaurant extends React.Component {
  state = {
    expanded: false,
  };

  handleExpandClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="title">Add new Restaurant:</Typography>
          {!this.state.expanded && (
            <Fab
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
              color="primary"
              aria-label="Add"
            >
              <AddIcon />
            </Fab>
          )}
        </div>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <Card>
            <CardContent>
              <form className={classes.form} noValidate autoComplete="off">
                <Grid justify="space-between" container spacing={16}>
                  <Grid item xs={12}>
                    <TextField
                      id="restaurant-name"
                      label="Restaurant Name"
                      fullWidth
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="restaurant-address"
                      label="Restaurant Address"
                      fullWidth
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="restaurant-phone"
                      label="Restaurant Phone"
                      fullWidth
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="restaurant-description"
                      label="Restaurant Description"
                      multiline
                      rowsMax="6"
                      fullWidth
                      className={classes.textField}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="contained" color="secondary" fullWidth>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="contained" color="primary" fullWidth>
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(AddRestaurant);
