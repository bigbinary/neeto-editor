import React, { useState } from "react";
import classnames from "classnames";
import { BubbleMenu } from "@tiptap/react";
import { roundArrow } from "tippy.js";
import "tippy.js/dist/svg-arrow.css";

import ImageEditorModal from "./ImageEditorModal";
import ImageOptions from "./ImageOptions";
import TextOptions from "./TextOptions";

export default function index({ editor, options: textOptions }) {
  const [isInvalidLink, setIsInvalidLink] = useState(false);
  const [isLinkOptionActive, setIsLinkOptionActive] = useState(false);
  const [isImageEditorModalOpen, setIsImageEditorModalOpen] = useState(false);
  const node = editor && editor.view.state.selection.node;
  const isImage = node && node.type.name === "image";

  if (!editor) {
    return null;
  }

  return (
    <div>
      <BubbleMenu
        editor={editor}
        tippyOptions={{
          arrow: roundArrow,
          placement: "top-start",
          zIndex: 99999,
          onHide: () => setIsLinkOptionActive(false),
        }}
        className={classnames("neeto-editor-bubble-menu", {
          "neeto-editor-bubble-menu-animate-shake": isInvalidLink,
        })}
      >
        {isImage ? (
          <ImageOptions
            editor={editor}
            isImageEditorModalOpen={isImageEditorModalOpen}
            setIsImageEditorModalOpen={setIsImageEditorModalOpen}
          />
        ) : (
          <TextOptions
            editor={editor}
            options={textOptions}
            setIsInvalidLink={setIsInvalidLink}
            isLinkOptionActive={isLinkOptionActive}
            setIsLinkOptionActive={setIsLinkOptionActive}
          />
        )}
      </BubbleMenu>
      <ImageEditorModal
        editor={editor}
        isOpen={isImageEditorModalOpen}
        onClose={() => setIsImageEditorModalOpen(false)}
      />
    </div>
  );
}
