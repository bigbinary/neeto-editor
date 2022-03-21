import React from "react";
import classNames from "classnames";

import { getEditorStyle } from "./helpers";

const MarkdownEditor = ({
  editor,
  className,
  style,
  strategy,
  limit,
  ...otherProps
}) => {
  const { inputFieldRef, onChange, state } = editor;
  const { length } = state;

  return (
    <textarea
      ref={inputFieldRef}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => {
        if (length >= limit && event.key !== "Backspace")
          event.preventDefault();
      }}
      className={classNames("ProseMirror neeto-editor-markdown", {
        [className]: className,
      })}
      style={getEditorStyle({ style, strategy, ref: inputFieldRef })}
      data-cy="neeto-editor-markdown-editor"
      role="textbox"
      {...otherProps}
    />
  );
};

export default MarkdownEditor;
