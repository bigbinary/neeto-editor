import React, { useEffect } from "react";
import classNames from "classnames";
import hljs from "highlight.js/lib/common";

const EditorContent = ({ content = "", className, ...otherProps }) => {
  useEffect(() => {
    // Highlight codeblocks;
    document
      .querySelectorAll("div.tiptap-content.tiptap-output pre code")
      .forEach((el) => {
        hljs.highlightElement(el);
      });
  }, [content]);

  return (
    <div
      className={classNames("tiptap-content tiptap-output", {
        [className]: className,
      })}
      dangerouslySetInnerHTML={{ __html: content }}
      {...otherProps}
    />
  );
};

export default EditorContent;
