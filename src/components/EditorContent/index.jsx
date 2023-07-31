import React, { useEffect, useRef } from "react";

import classnames from "classnames";
import DOMPurify from "dompurify";
import { copyToClipboard } from "neetocommons/utils";
import { Copy } from "neetoicons";
import { Button } from "neetoui";
import ReactDOM from "react-dom";

import { EDITOR_CONTENT_CLASSNAME, SANITIZE_OPTIONS } from "./constants";
import { highlightCode, substituteVariables } from "./utils";

const CopyButton = ({ onClick }) => (
  <Button icon={Copy} size="small" style="text" onClick={onClick} />
);

const EditorContent = ({
  content = "",
  variables = [],
  className,
  ...otherProps
}) => {
  const editorContentRef = useRef(null);

  const htmlContent = substituteVariables(highlightCode(content), variables);
  const sanitize = DOMPurify.sanitize;

  const injectCopyButtonToCodeBlocks = () => {
    const preTags = editorContentRef.current?.querySelectorAll(
      ".neeto-editor-content pre"
    );

    preTags.forEach(preTag => {
      const button = document.createElement("div");
      button.className = "neeto-editor-codeblock-options";
      const handleButtonClick = () => {
        copyToClipboard(preTag.textContent);
      };
      ReactDOM.render(<CopyButton onClick={handleButtonClick} />, button);
      preTag.appendChild(button);
    });
  };

  useEffect(() => {
    injectCopyButtonToCodeBlocks();
  }, [content]);

  return (
    <div
      data-cy="neeto-editor-content"
      ref={editorContentRef}
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

export default React.memo(EditorContent);
