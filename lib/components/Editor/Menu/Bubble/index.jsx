import React, { useState } from "react";

import { BubbleMenu as BubbleMenuTipTap } from "@tiptap/react";
import classnames from "classnames";
import { roundArrow } from "tippy.js";
import "tippy.js/dist/svg-arrow.css";

import { EDITOR_OPTIONS } from "common/constants";
import { isNilOrEmpty } from "utils/common";

import Options from "./Options";

const Bubble = ({
  editor,
  options: textOptions,
  mentions = [],
  setMediaUploader,
  tooltips = {},
  handleUploadAttachments,
}) => {
  const [isInvalidLink, setIsInvalidLink] = useState(false);
  const [isLinkOptionActive, setIsLinkOptionActive] = useState(false);
  const selectedNode = editor && editor.view.state.selection.node;
  const isImageNodeSelected =
    selectedNode && selectedNode.type.name === "image";

  const bubbleMenuOptions = [
    EDITOR_OPTIONS.BOLD,
    EDITOR_OPTIONS.ITALIC,
    EDITOR_OPTIONS.UNDERLINE,
    EDITOR_OPTIONS.STRIKETHROUGH,
    EDITOR_OPTIONS.LINK,
  ];

  const noTextOptions = isNilOrEmpty(
    textOptions.filter(option => bubbleMenuOptions.includes(option))
  );
  if (!editor || (!isImageNodeSelected && noTextOptions)) {
    return null;
  }

  return (
    <div>
      <BubbleMenuTipTap
        editor={editor}
        className={classnames("neeto-editor-bubble-menu", {
          "neeto-editor-bubble-menu-animate-shake": isInvalidLink,
        })}
        tippyOptions={{
          arrow: roundArrow,
          zIndex: 99999,
          onHide: () => setIsLinkOptionActive(false),
          theme: "neeto-editor-bubble-menu",
          maxWidth: 500,
        }}
      >
        <Options
          editor={editor}
          handleUploadAttachments={handleUploadAttachments}
          isLinkOptionActive={isLinkOptionActive}
          mentions={mentions}
          options={textOptions}
          setIsInvalidLink={setIsInvalidLink}
          setIsLinkOptionActive={setIsLinkOptionActive}
          setMediaUploader={setMediaUploader}
          tooltips={tooltips}
        />
      </BubbleMenuTipTap>
    </div>
  );
};

export default Bubble;
