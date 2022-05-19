import React from "react";
import classNames from "classnames";

import { getEditorStyle, handleKeyDown } from "./helpers";

const MarkdownEditor = ({
  editor,
  className,
  style,
  strategy,
  limit,
  onFocus,
  onBlur,
  ...otherProps
}) => {
  const { inputFieldRef, onChange, state } = editor;
  const { length } = state;

  return (
    <textarea
      ref={inputFieldRef}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) =>
        handleKeyDown({ event, inputFieldRef, length, limit, onChange })
      }
      onFocus={onFocus}
      onBlur={onBlur}
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
