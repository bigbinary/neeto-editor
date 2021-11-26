import React, { useEffect } from "react";
import highlightCode from "utils/highlightCode";

const EditorContent = ({ content = "", ...otherProps }) => {
  useEffect(() => {
    // Highlight codeblocks;
    highlightCode();
  }, [content]);

  return <div dangerouslySetInnerHTML={{ __html: content }} {...otherProps} />;
};

export default EditorContent;
