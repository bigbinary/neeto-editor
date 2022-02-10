import React, { useState } from "react";
import classnames from "classnames";
import { BubbleMenu } from "@tiptap/react";
import { CenterAlign, LeftAlign, RightAlign, Computer, Edit } from "neetoicons";
import { roundArrow } from "tippy.js";
import "tippy.js/dist/svg-arrow.css";

import Modal from "components/Common/Modal";

import ImageEditor from "./ImageEditor";

const ImageBubbleMenu = ({ editor }) => {
  const [isImageEditorModalOpen, setIsImageEditorModalOpen] = useState(false);
  const node = editor && editor.view.state.selection.node;
  const isImage = node && node.type.name === "image";

  if (!editor) {
    return null;
  }

  const imageOptions = isImage
    ? [
        {
          Icon: LeftAlign,
          command: () =>
            editor
              .chain()
              .focus()
              .setImageAttributes({
                size: "small",
                float: "left",
                align: "none",
              })
              .run(),
          active: editor.isActive("image", {
            size: "small",
            float: "left",
            align: "none",
          }),
          optionName: "Float Left",
        },
        {
          Icon: CenterAlign,
          command: () =>
            editor
              .chain()
              .focus()
              .setImageAttributes({
                size: "small",
                float: "none",
                align: "center",
              })
              .run(),
          active: editor.isActive("image", {
            size: "small",
            float: "none",
            align: "center",
          }),
          optionName: "Align Center",
        },
        {
          Icon: Computer,
          command: () =>
            editor
              .chain()
              .focus()
              .setImageAttributes({
                size: "large",
                float: "none",
                align: "center",
              })
              .run(),
          active: editor.isActive("image", {
            size: "large",
            float: "none",
            align: "center",
          }),
          optionName: "Banner",
        },
        {
          Icon: RightAlign,
          command: () =>
            editor
              .chain()
              .focus()
              .setImageAttributes({
                size: "small",
                float: "right",
                align: "none",
              })
              .run(),
          active: editor.isActive("image", {
            size: "small",
            float: "right",
            align: "center",
          }),
          optionName: "Float Right",
        },
        {
          Icon: Edit,
          command: () => setIsImageEditorModalOpen(true),
          active: isImageEditorModalOpen,
          optionName: "Alt Text",
        },
      ]
    : [];

  return (
    <>
      <BubbleMenu
        editor={editor}
        tippyOptions={{
          arrow: roundArrow,
          zIndex: 99999,
        }}
        className="neeto-editor-bubble-menu"
      >
        {imageOptions.map((option) => (
          <Option key={option.optionName} {...option} />
        ))}
      </BubbleMenu>
      <Modal
        isOpen={isImageEditorModalOpen}
        onClose={() => setIsImageEditorModalOpen(false)}
      >
        <div className="neeto-editor-image-uploader">
          <div className="neeto-editor-image-uploader__content">
            <ImageEditor
              editor={editor}
              onClose={() => setIsImageEditorModalOpen(false)}
              url={node?.attrs.src}
              alt={node?.attrs.alt}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

const Option = ({ Icon, command, active }) => (
  <div
    className={classnames("neeto-editor-bubble-menu__item", {
      active: active,
    })}
    onClick={command}
  >
    <Icon size={20} />
  </div>
);

export default ImageBubbleMenu;
