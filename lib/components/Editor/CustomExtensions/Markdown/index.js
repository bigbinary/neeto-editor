import React from "react";
import classNames from "classnames";

import { markdownToHtml } from "utils/markdown";

import useMarkdownMode from "./useMarkdownMode";

import { getMarkdownStyles } from "../../helpers";

const MarkdownEditor = ({
  editor,
  className,
  style,
  strategy,
  onChange,
  onSubmit,
  initialValue,
  ...otherProps
}) => {
  const { textareaRef, content, setContent } = useMarkdownMode({
    editor,
    onSubmit,
    initialValue,
  });
  const markdownStyles = getMarkdownStyles({ strategy, style, textareaRef });

  const handleChange = (e) => {
    setContent(e.target.value);
    onChange?.(markdownToHtml(e.target.value));
  };

  return (
    <textarea
      ref={textareaRef}
      value={content}
      onChange={handleChange}
      className={classNames("ProseMirror neeto-editor-markdown", {
        [className]: className,
      })}
      data-cy="neeto-editor-markdown-editor"
      style={markdownStyles}
      {...otherProps}
    />
  );
};

export default MarkdownEditor;
