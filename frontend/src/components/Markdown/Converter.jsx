import React from "react";
import { convertToHTML } from "draft-convert";
import { Typography } from "@material-ui/core";

const styleToHTML = style => {
  switch (style) {
    case "ITALIC":
      return <em className="italic" />;
    case "BOLD":
      return <strong className="bold" />;
    case "HIGHLIGHT":
      return <strong className="highlight" />;
    default:
      return null;
  }
};

const blockToHTML = block => {
  switch (block.type) {
    case "header-two":
      return <Typography gutterBottom variant="h5" component="h2" />;
    case "unstyled":
      return <Typography gutterBottom />;
    case "blockquote":
      return (
        <Typography
          style={{
            paddingLeft: 8,
            borderLeft: "4px solid rgba(0, 0, 0, 0.14)"
          }}
          gutterBottom
        />
      );
    default:
      return null;
  }
};

export const options = {
  styleToHTML,
  blockToHTML
};

const converterFunction = convertToHTML(options);

export default contentState => converterFunction(contentState);
