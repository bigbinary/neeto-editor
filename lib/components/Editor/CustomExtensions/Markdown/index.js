import React from "react";
import classNames from "classnames";

import { markdownToHtml } from "utils/markdown";

import useMarkdownMode from "./useMarkdownMode";

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
    style,
    onSubmit,
    strategy,
    initialValue,
  });

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
      {...otherProps}
    />
  );
};

export default MarkdownEditor;
