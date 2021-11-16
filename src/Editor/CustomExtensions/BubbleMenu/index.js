import React from "react";
import classnames from "classnames";
import { BubbleMenu } from "@tiptap/react";
import {
  TextBold,
  TextItalic,
  TextCross,
  Link,
  Code,
  Highlight,
} from "@bigbinary/neeto-icons";
import { roundArrow } from "tippy.js";
import "tippy.js/dist/svg-arrow.css";

export default function index({ editor, formatterOptions }) {
  if (!editor) {
    return null;
  }
  const options = [
    {
      Icon: TextBold,
      command: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      optionName: "bold",
    },
    {
      Icon: TextItalic,
      command: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      optionName: "italic",
    },
    {
      Icon: TextCross,
      command: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
      optionName: "strike",
    },
    {
      Icon: Link,
      command: () => {
        if (editor.isActive("link")) {
          editor.chain().focus().unsetLink().run();
        } else {
          const url = window.prompt("Please enter your URL");
          editor.chain().focus().setLink({ href: url }).run();
        }
      },
      active: editor.isActive("link"),
      optionName: "link",
    },
    {
      Icon: Code,
      command: () => editor.chain().focus().toggleCode().run(),
      active: editor.isActive("code"),
      optionName: "code",
    },
    {
      Icon: Highlight,
      command: () => editor.chain().focus().toggleHighlight().run(),
      active: editor.isActive("highlight"),
      optionName: "highlight",
    },
  ];
  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ arrow: roundArrow }}
      className="relative flex overflow-hidden rounded shadow editor-command-list--root"
    >
      {options
        .filter(({ optionName }) => formatterOptions.includes(optionName))
        .map((option) => (
          <Option {...option} key={option.optionName} />
        ))}
    </BubbleMenu>
  );
}

const Option = ({ Icon, command, active, iconSize }) => (
  <div
    className={classnames(
      "p-3 cursor-pointer editor-command-list--item transition-colors",
      {
        "text-gray-400": !active,
        "text-white": active,
      }
    )}
    onClick={command}
  >
    <Icon size={iconSize || 24} />
  </div>
);
