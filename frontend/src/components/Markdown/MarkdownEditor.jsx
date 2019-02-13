import React from "react";
import {
  Grid,
  withStyles,
  FormControl,
  FormLabel,
  InputLabel
} from "@material-ui/core";
import InlineStyleControls from "./InlineStyleControls";
import BlockStyleControls from "./BlockStyleControls";
import { Editor } from "draft-js";

const styles = theme => ({
  markdownHeader: {
    background: theme.palette.grey[200],
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit / 2
  }
});

const MarkdownEditor = props => {
  const { classes, editorState } = props;

  return (
    <Grid container>
      <Grid
        className={classes.markdownHeader}
        alignItems="center"
        justify="space-between"
        container
        item
        xs={12}
      >
        <Grid item>
          <BlockStyleControls
            editorState={editorState}
            onToggle={props.toggleBlockType}
          />
        </Grid>
        <Grid item>
          <InlineStyleControls
            editorState={editorState}
            onToggle={props.toggleInlineStyle}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <FormLabel htmlFor="editor">Restaurant Description</FormLabel>
          <Editor
            style={{ cursor: "text" }}
            id="editor"
            editorState={editorState}
            onChange={props.onChange}
            spellCheck={true}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(MarkdownEditor);
