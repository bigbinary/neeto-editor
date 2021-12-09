import React, { useEffect } from "react";
import highlightCode from "utils/highlightCode";
import DOMPurify from "dompurify";
import classnames from "classnames";
import { EDITOR_CONTENT_CLASSNAME } from "../../constants/common";

const EditorContent = ({ content = "", classNames, ...otherProps }) => {
  useEffect(() => {
    // Highlight codeblocks;
    highlightCode();
  }, [content]);

  return (
    <div
      className={classnames(EDITOR_CONTENT_CLASSNAME, {
        [classNames]: classNames,
      })}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      {...otherProps}
    />
  );
};

export default EditorContent;
