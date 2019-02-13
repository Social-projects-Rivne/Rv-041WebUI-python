import React from "react";
import StyleButton from "./StyleButton";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined
} from "@material-ui/icons/";

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD", icon: <FormatBold /> },
  { label: "Italic", style: "ITALIC", icon: <FormatItalic /> },
  { label: "Underline", style: "UNDERLINE", icon: <FormatUnderlined /> }
];

const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return INLINE_STYLES.map(type => (
    <StyleButton
      key={type.label}
      active={currentStyle.has(type.style)}
      label={type.label}
      icon={type.icon}
      onToggle={props.onToggle}
      style={type.style}
    />
  ));
};

export default InlineStyleControls;
