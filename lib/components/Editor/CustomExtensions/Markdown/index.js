import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { htmlToMarkdown, markdownToHtml } from "utils/markdown";

const MarkdownEditor = ({ editor, className, ...otherProps }) => {
  const markdownData = htmlToMarkdown(editor.getHTML());

  const [content, setContent] = useState(markdownData);
  const editorContentRef = useRef();

  useEffect(() => {
    editorContentRef.current = content;
  }, [content]);

  useEffect(() => {
    editorContentRef.current = content;
    return () =>
      editor.commands.setContent(markdownToHtml(editorContentRef.current));
  }, []);

  return (
    <div
      contentEditable
      suppressContentEditableWarning
      onInput={(e) => setContent(e.target.textContent)}
      className={classNames(
        "ProseMirror focus:outline-none whitespace-pre-wrap p-3",
        { [className]: className }
      )}
      {...otherProps}
    >
      {markdownData}
    </div>
  );
};

export default MarkdownEditor;
