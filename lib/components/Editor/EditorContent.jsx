import React from "react";

import classnames from "classnames";
import DOMPurify from "dompurify";

import { EDITOR_CONTENT_CLASSNAME } from "constants/common";
import highlightCode from "utils/highlightCode";

const EditorContent = ({ content = "", className, ...otherProps }) => {
  const htmlContent = highlightCode(content);
  const sanitize = DOMPurify.sanitize;

  return (
    <div
      className={classnames(EDITOR_CONTENT_CLASSNAME, {
        [className]: className,
      })}
      dangerouslySetInnerHTML={{
        __html: sanitize(htmlContent, {
          ADD_TAGS: ["iframe"],
          ADD_ATTR: ["target", "allow", "allowfullscreen", "frameborder"],
        }),
      }}
      data-cy="neeto-editor-content"
      {...otherProps}
    />
  );
};

export default EditorContent;
