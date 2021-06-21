import React from "react";
import classnames from "classnames";
import { BubbleMenu } from "@tiptap/react";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaHighlighter,
  FaCode,
  FaLink,
} from "react-icons/fa";

export default function index({ editor, formatterOptions }) {
  if (!editor) {
    return null;
  }
  const options = [
    {
      Icon: FaBold,
      command: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      optionName: "bold",
    },
    {
      Icon: FaItalic,
      command: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      optionName: "italic",
    },
    {
      Icon: FaStrikethrough,
      command: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
      optionName: "strike",
    },
    {
      Icon: FaLink,
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
      Icon: FaCode,
      command: () => editor.chain().focus().toggleCode().run(),
      active: editor.isActive("code"),
      optionName: "code",
    },
    {
      Icon: FaHighlighter,
      command: () => editor.chain().focus().toggleHighlight().run(),
      active: editor.isActive("highlight"),
      optionName: "highlight",
    },
  ];
  return (
    <BubbleMenu editor={editor}>
      <div className="relative flex items-center overflow-hidden bg-gray-900 rounded shadow">
        {options
          .filter(({ optionName }) => formatterOptions.includes(optionName))
          .map((option) => (
            <Option {...option} key={option.optionName} />
          ))}
      </div>
    </BubbleMenu>
  );
}

const Option = ({ Icon, command, active, iconSize }) => (
  <div
    className={classnames("p-3 cursor-pointer hover:bg-gray-800", {
      "text-gray-400": !active,
      "text-white": active,
    })}
    onClick={command}
  >
    <Icon size={iconSize || 15} />
  </div>
);
