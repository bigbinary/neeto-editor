import React, { useEffect } from "react";
import highlightCode from "utils/highlightCode";
import DOMPurify from "dompurify";

const EditorContent = ({ content = "", ...otherProps }) => {
  useEffect(() => {
    // Highlight codeblocks;
    highlightCode();
  }, [content]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      {...otherProps}
    />
  );
};

export default EditorContent;
