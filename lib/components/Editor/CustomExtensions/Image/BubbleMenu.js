import React from "react";
import classnames from "classnames";
import { BubbleMenu } from "@tiptap/react";
import { CenterAlign, LeftAlign, RightAlign, Computer, Edit } from "neetoicons";
import { roundArrow } from "tippy.js";
import "tippy.js/dist/svg-arrow.css";

export default function index({ editor }) {
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
          active: editor.isActive("floatLeft"),
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
          active: editor.isActive("alignCenter"),
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
          active: editor.isActive("banner"),
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
          active: editor.isActive("floatRight"),
          optionName: "Float Right",
        },
        {
          Icon: Edit,
          command: () => editor.chain().focus().toggleHighlight().run(),
          active: editor.isActive("altText"),
          optionName: "Alt Text",
        },
      ]
    : [];

  return (
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
  );
}

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
