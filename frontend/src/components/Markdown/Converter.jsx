import React from "react";
import { convertToHTML } from "draft-convert";

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
  const blockType = block.type;
};

export const options = {
  styleToHTML,
  blockToHTML
};

const converterFunction = convertToHTML(options);

export default contentState => converterFunction(contentState);
