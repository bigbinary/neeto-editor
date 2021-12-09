import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { HTMLToMarkDown, markdownToHTML } from "utils/markdown";

const MarkdownEditor = ({ editor, className, ...otherProps }) => {
  const markdownData = HTMLToMarkDown(editor.getHTML());

  const [content, setContent] = useState(markdownData);
  const editorContentRef = useRef();

  useEffect(() => {
    editorContentRef.current = content;
  }, [content]);

  useEffect(() => {
    editorContentRef.current = content;
    return () =>
      editor.commands.setContent(markdownToHTML(editorContentRef.current));
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
