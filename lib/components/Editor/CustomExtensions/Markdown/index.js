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
    <div
      contentEditable
      ref={inputFieldRef}
      onKeyDown={(event) => {
        if (length >= limit && event.key !== "Backspace")
          event.preventDefault();
      }}
      onInput={(event) => onChange(event.target.textContent)}
      className={classNames("ProseMirror neeto-editor-markdown", {
        [className]: className,
      })}
      style={getEditorStyle({ strategy, style })}
      data-cy="neeto-editor-markdown-editor"
      role="textbox"
      {...otherProps}
    />
  );
};

export default MarkdownEditor;
