import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import InlineStyleControls from "./InlineStyleControls";
import BlockStyleControls from "./BlockStyleControls";

const styles = theme => ({
  markdownHeader: {
    background: theme.palette.grey[200],
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit / 2
  }
});

class MarkdownEditor extends React.Component {
  state = { editorState: EditorState.createEmpty() };

  onChange = editorState => {
    const contentState = editorState.getCurrentContent();
    this.props.onMarkupChange(convertToRaw(contentState));

    this.setState({ editorState });
  };

  setEditor = editor => {
    this.editor = editor;
  };

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  render() {
    const { editorState } = this.state;
    const { classes } = this.props;

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
              onToggle={this.toggleBlockType}
            />
          </Grid>
          <Grid item>
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            ref="editor"
            spellCheck={true}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(MarkdownEditor);
