import React from "react";
import StyleButton from "./StyleButton";
import {
  TextFields,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote
} from "@material-ui/icons/";

const BLOCK_TYPES = [
  { label: "Heading", style: "header-two", icon: <TextFields /> },
  { label: "Blockquote", style: "blockquote", icon: <FormatQuote /> },
  { label: "UL", style: "unordered-list-item", icon: <FormatListBulleted /> },
  { label: "OL", style: "ordered-list-item", icon: <FormatListNumbered /> }
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return BLOCK_TYPES.map(type => (
    <StyleButton
      key={type.label}
      active={type.style === blockType}
      label={type.label}
      icon={type.icon}
      onToggle={props.onToggle}
      style={type.style}
    />
  ));
};

export default BlockStyleControls;
