import React from "react";

import ImageUploaderPresentational from "./ImageUploaderPresentational";

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      error: false,
      file: null,
      imgPreview: ""
    };
  }

  allowedTypes = ["image/jpeg", "image/png", "image/svg+xml"];

  isImageType(file) {
    if (file["type"] === undefined) return false;
    return this.allowedTypes.includes(file.type);
  }

  dragEventCounter = 0;
  dragenterListener = event => {
    this.overrideEventDefaults(event);
    this.dragEventCounter++;

    if (
      event.dataTransfer.items &&
      event.dataTransfer.items.length <= 1 &&
      this.isImageType(event.dataTransfer.items[0])
    ) {
      this.setState({ dragging: true, error: false });
    } else {
      this.setState({ error: true });
    }
  };

  dragleaveListener = event => {
    this.overrideEventDefaults(event);
    this.dragEventCounter--;

    if (this.dragEventCounter === 0) {
      this.setState({ dragging: false, error: false });
    }
  };

  dropListener = event => {
    this.overrideEventDefaults(event);
    this.dragEventCounter = 0;
    this.setState({ dragging: false });

    if (
      event.dataTransfer.files &&
      event.dataTransfer.files.length <= 1 &&
      this.isImageType(event.dataTransfer.files[0])
    ) {
      this.setState({
        file: event.dataTransfer.files[0],
        imgPreview: URL.createObjectURL(event.dataTransfer.files[0]),
        error: false
      });
      this.props.imgFileHandler(event.dataTransfer.files[0]);
    } else {
      this.setState({ error: true });
    }
  };

  overrideEventDefaults = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  onSelectFileClick = () => {
    this.fileUploaderInput && this.fileUploaderInput.click();
  };

  onFileChanged = event => {
    if (
      event.target.files &&
      event.target.files.length <= 1 &&
      this.isImageType(event.target.files[0])
    ) {
      this.setState({
        file: event.target.files[0],
        imgPreview: URL.createObjectURL(event.target.files[0]),
        error: false
      });
      this.props.imgFileHandler(event.target.files[0]);
    } else {
      this.setState({
        error: true
      });
    }
  };

  componentDidMount() {
    window.addEventListener("dragover", event => {
      this.overrideEventDefaults(event);
    });
    window.addEventListener("drop", event => {
      this.overrideEventDefaults(event);
    });
  }

  componentWillUnmount() {
    window.removeEventListener("dragover", this.overrideEventDefaults);
    window.removeEventListener("drop", this.overrideEventDefaults);
  }

  render() {
    const { dragging, file, imgPreview, error } = this.state;
    return (
      <ImageUploaderPresentational
        dragging={dragging}
        error={error}
        file={file}
        imgPreview={imgPreview}
        onSelectFileClick={this.onSelectFileClick}
        onDrag={this.overrideEventDefaults}
        onDragStart={this.overrideEventDefaults}
        onDragEnd={this.overrideEventDefaults}
        onDragOver={this.overrideEventDefaults}
        onDragEnter={this.dragenterListener}
        onDragLeave={this.dragleaveListener}
        onDrop={this.dropListener}
      >
        <input
          ref={el => (this.fileUploaderInput = el)}
          onChange={this.onFileChanged}
          name="img"
          accept="image/*"
          multiple={false}
          style={{ display: "none" }}
          type="file"
        />
      </ImageUploaderPresentational>
    );
  }
}

export default ImageUploader;
