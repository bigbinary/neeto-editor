import React, { useEffect, useRef, useState } from "react";

import classnames from "classnames";
import DOMPurify from "dompurify";
import CopyToClipboardButton from "neetomolecules/CopyToClipboardButton";
import { isNil, not } from "ramda";
import { createRoot } from "react-dom/client";

import { EDITOR_CONTENT_CLASSNAME, SANITIZE_OPTIONS } from "./constants";
import ImagePreview from "./ImagePreview";
import { highlightCode, substituteVariables } from "./utils";

const EditorContent = ({
  content = "",
  variables = [],
  className,
  ...otherProps
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
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
      const root = createRoot(button);
      root.render(
        <CopyToClipboardButton
          size="small"
          style="text"
          value={preTag.textContent}
        />
      );
      preTag.appendChild(button);
    });

    const figureTags = editorContentRef.current?.querySelectorAll("figure");
    figureTags.forEach(figureTag => {
      const image = figureTag.querySelector("img");
      const link = figureTag.querySelector("a");
      if (isNil(image) || isNil(link)) return;

      if (not(window.getComputedStyle(link).pointerEvents === "none")) {
        return;
      }
      figureTag.style.cursor = "pointer";
      figureTag.addEventListener("click", () => {
        setImagePreviewUrl(image.src);
      });
    });
  };

  useEffect(() => {
    injectCopyButtonToCodeBlocks();
  }, [content]);

  return (
    <>
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
      {imagePreviewUrl && (
        <ImagePreview {...{ imagePreviewUrl, setImagePreviewUrl }} />
      )}
    </>
  );
};

export default React.memo(EditorContent);
