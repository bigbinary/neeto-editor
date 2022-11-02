import React from "react";

import classnames from "classnames";
import DOMPurify from "dompurify";

import { EDITOR_CONTENT_CLASSNAME, SANITIZE_OPTIONS } from "./constants";
import { highlightCode } from "./utils";

const EditorContent = ({ content = "", className, ...otherProps }) => {
  const htmlContent = highlightCode(content);
  const sanitize = DOMPurify.sanitize;

  return (
    <div
      className={classnames(EDITOR_CONTENT_CLASSNAME, {
        [className]: className,
      })}
      dangerouslySetInnerHTML={{
        __html: sanitize(htmlContent, SANITIZE_OPTIONS),
      }}
      data-cy="neeto-editor-content"
      {...otherProps}
    />
  );
};

export default EditorContent;
