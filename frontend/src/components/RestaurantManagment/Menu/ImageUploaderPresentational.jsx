import React from "react";
import classnames from "classnames";

import { withStyles, CardMedia, Button, Typography } from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { PhotoCamera } from "@material-ui/icons";

const styles = theme => ({
  uploader: {
    minHeight: "300px",
    position: "relative"
  },
  uploaderContent: {
    position: "absolute",
    top: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 2,
    left: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    border: `2px dashed ${theme.palette.primary.main}`,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.grey[100]
  },
  uploaderWithImage: {
    backgroundColor: fade(theme.palette.grey[100], 0.5)
  },
  uploaderDragging: {
    backgroundColor: fade(theme.palette.secondary.light, 0.8)
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

const ImageUploaderPresentational = props => {
  const {
    dragging,
    file,
    imgPreview,
    onSelectFileClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDrop,
    classes
  } = props;

  const fileName = file ? file.name : "No File Uploaded!";

  return (
    <div
      className={classes.uploader}
      onDrag={onDrag}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {imgPreview && (
        <CardMedia
          className={classes.media}
          component="img"
          src={imgPreview}
          title={file}
        />
      )}
      <div
        className={classnames(classes.uploaderContent, {
          [classes.uploaderDragging]: dragging,
          [classes.uploaderWithImage]: imgPreview
        })}
      >
        <Typography variant="subtitle2" gutterBottom>
          {fileName}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Drag & Drop Image
        </Typography>
        <Typography variant="h6" gutterBottom>
          or
        </Typography>
        <label onClick={onSelectFileClick} htmlFor="file">
          <Button variant="contained" color="primary">
            Select File
            <PhotoCamera className={classes.rightIcon} />
          </Button>
        </label>
      </div>
      {props.children}
    </div>
  );
};

export default withStyles(styles)(ImageUploaderPresentational);
