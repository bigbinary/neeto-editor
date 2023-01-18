import React from "react";

import classnames from "classnames";
import DOMPurify from "dompurify";

import { isNilOrEmpty } from "utils/common";

import { EDITOR_CONTENT_CLASSNAME, SANITIZE_OPTIONS } from "./constants";
import { highlightCode, substituteVariables } from "./utils";

const EditorContent = ({
  content = "",
  variables = [],
  className,
  ...otherProps
}) => {
  const highlightedContent = highlightCode(content);
  const htmlContent = !isNilOrEmpty(variables)
    ? substituteVariables(highlightedContent, variables)
    : highlightedContent;
  const sanitize = DOMPurify.sanitize;

  return (
    <div
      data-cy="neeto-editor-content"
      className={classnames(EDITOR_CONTENT_CLASSNAME, {
        [className]: className,
      })}
      dangerouslySetInnerHTML={{
        __html: sanitize(htmlContent, SANITIZE_OPTIONS),
      }}
      {...otherProps}
    />
  );
};

export default EditorContent;
