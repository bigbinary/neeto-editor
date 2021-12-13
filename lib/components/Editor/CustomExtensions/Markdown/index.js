import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { htmlToMarkdown, markdownToHtml } from "utils/markdown";

const MarkdownEditor = ({ editor, className, ...otherProps }) => {
  const [content, setContent] = useState(() =>
    htmlToMarkdown(editor.getHTML())
  );

  const textareaRef = useRef();
  const contentRef = useRef(content);

  useEffect(() => {
    contentRef.current = content;

    const PADDING_HEIGHT = 12;
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + PADDING_HEIGHT * 2 + "px";
  }, [content]);

  useEffect(() => {
    return () => editor.commands.setContent(markdownToHtml(contentRef.current));
  }, []);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <textarea
      ref={textareaRef}
      value={content}
      spellCheck={false}
      onChange={handleChange}
      className={classNames(
        "ProseMirror focus:outline-none whitespace-pre-wrap p-3 w-full resize-none",
        { [className]: className }
      )}
      {...otherProps}
    />
  );
};

export default MarkdownEditor;
