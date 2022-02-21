import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";

import { htmlToMarkdown, markdownToHtml } from "utils/markdown";

const MarkdownEditor = ({
  editor,
  className,
  style,
  strategy,
  onChange,
  onSubmit,
  value,
  ...otherProps
}) => {
  const [content, setContent] = useState(() =>
    htmlToMarkdown(editor?.getHTML() || value)
  );

  const textareaRef = useRef();
  const contentRef = useRef(content);

  const BORDER_HEIGHT = 1;

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    document.addEventListener("keydown", handleSubmit);

    return () => {
      editor?.commands.setContent(markdownToHtml(contentRef.current));
      document.removeEventListener("keydown", handleSubmit);
    };
  }, []);

  useLayoutEffect(() => {
    textareaRef.current.style = style;
    strategy === "flexible" &&
      (textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 2 * BORDER_HEIGHT + "px");
  }, [content]);

  const handleChange = (e) => {
    setContent(e.target.value);
    onChange?.(markdownToHtml(e.target.value));
  };

  // Submit on Ctrl+Enter and Cmd+Enter
  const handleSubmit = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      onSubmit?.(markdownToHtml(contentRef.current));
      textareaRef.current.blur();
    }
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
