import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames";

import { htmlToMarkdown, markdownToHtml } from "utils/markdown";

const MarkdownEditor = ({
  editor,
  className,
  style,
  strategy,
  ...otherProps
}) => {
  const [content, setContent] = useState(() =>
    htmlToMarkdown(editor?.getHTML() || "")
  );

  const textareaRef = useRef();
  const contentRef = useRef(content);

  const BORDER_HEIGHT = 1;

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    return () => editor.commands.setContent(markdownToHtml(contentRef.current));
  }, []);

  useLayoutEffect(() => {
    textareaRef.current.style = style;
    strategy === "flexible" &&
      (textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 2 * BORDER_HEIGHT + "px");
  }, [content]);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <textarea
      ref={textareaRef}
      value={content}
      onChange={handleChange}
      className={classNames("ProseMirror neeto-editor-markdown", {
        [className]: className,
      })}
      {...otherProps}
    />
  );
};

export default MarkdownEditor;
