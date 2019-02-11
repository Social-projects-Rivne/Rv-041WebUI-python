import React from "react";
import { TextValidator } from "react-material-ui-form-validator";
import { TextField, IconButton, Grid, withStyles } from "@material-ui/core";
import {
  FormatBold,
  FormatItalic,
  TextFormat,
  TextFields
} from "@material-ui/icons/";

const styles = theme => ({
  markdownHeader: {
    background: theme.palette.grey[200],
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit
  }
});

class MarkdownEditor extends React.Component {
  state = {
    markupMod: ""
  };

  render() {
    const { classes, name, value, label } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} className={classes.markdownHeader}>
            <IconButton size="small">
              <TextFields />
            </IconButton>
            <IconButton size="small">
              <FormatBold />
            </IconButton>
            <IconButton size="small">
              <FormatItalic />
            </IconButton>
            <IconButton size="small">
              <TextFormat />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <TextValidator
              value={value}
              name={name}
              label={label}
              multiline
              rows="6"
              fullWidth
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MarkdownEditor);
