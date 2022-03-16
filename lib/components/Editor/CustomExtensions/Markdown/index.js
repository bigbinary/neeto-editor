import React from "react";
import classNames from "classnames";
import { getEditorStyle } from "./helpers";

const MarkdownEditor = ({
  editor,
  className,
  style,
  strategy,
  ...otherProps
}) => {
  const { inputFieldRef, content, onChange } = editor;

  return (
    <textarea
      ref={inputFieldRef}
      value={content}
      onChange={onChange}
      className={classNames("ProseMirror neeto-editor-markdown", {
        [className]: className,
      })}
      style={getEditorStyle({ strategy, style, inputRef: inputFieldRef })}
      data-cy="neeto-editor-markdown-editor"
      {...otherProps}
    />
  );
};

export default MarkdownEditor;
