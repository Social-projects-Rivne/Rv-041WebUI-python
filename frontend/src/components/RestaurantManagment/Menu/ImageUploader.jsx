import React from "react";

import ImageUploaderPresentational from "./ImageUploaderPresentational";

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      file: null,
      imgPreview: ""
    };
  }

  dragEventCounter = 0;
  dragenterListener = event => {
    this.overrideEventDefaults(event);
    this.dragEventCounter++;
    if (event.dataTransfer.items && event.dataTransfer.items[0]) {
      this.setState({ dragging: true });
    } else if (
      event.dataTransfer.types &&
      event.dataTransfer.types[0] === "Files"
    ) {
      this.setState({ dragging: true });
    }
  };

  dragleaveListener = event => {
    this.overrideEventDefaults(event);
    this.dragEventCounter--;

    if (this.dragEventCounter === 0) {
      this.setState({ dragging: false });
    }
  };

  dropListener = event => {
    this.overrideEventDefaults(event);
    this.dragEventCounter = 0;
    this.setState({ dragging: false });

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      this.setState({
        file: event.dataTransfer.files[0],
        imgPreview: URL.createObjectURL(event.dataTransfer.files[0])
      });
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
    if (event.target.files && event.target.files[0]) {
      this.setState({ file: event.target.files[0] });
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
    const { dragging, file, imgPreview } = this.state;
    return (
      <ImageUploaderPresentational
        dragging={dragging}
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
          style={{ display: "none" }}
          type="file"
        />
      </ImageUploaderPresentational>
    );
  }
}

export default ImageUploader;
