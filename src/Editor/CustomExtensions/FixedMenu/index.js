import React from "react";
import classnames from "classnames";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaQuoteRight,
  FaCode,
  FaLink,
  FaListUl,
  FaListOl,
  FaUndo,
  FaRedo,
  FaFileImage,
} from "react-icons/fa";

import TextColorOption from "./TextColorOption";
import FontSizeOption from "./FontSizeOption";

import sharedState from "../../sharedState";

const FixedMenu = ({ editor }) => {
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
      Icon: FaQuoteRight,
      command: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive("blockquote"),
      optionName: "block-quote",
    },
    {
      Icon: FaCode,
      command: () => editor.chain().focus().toggleCode().run(),
      active: editor.isActive("code"),
      optionName: "code",
    },
    {
      Icon: FaListUl,
      command: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
      optionName: "bullet-list",
    },
    {
      Icon: FaListOl,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      optionName: "ordered-list",
    },
    {
      Icon: FaFileImage,
      command: ({ editor, range }) => {
        sharedState.showImageUpload = true;
        sharedState.range = range;
        editor.chain().focus().deleteRange(range).run();
      },
      optionName: "image-upload",
    },
    {
      Icon: FaUndo,
      command: () => editor.chain().focus().undo().run(),
      optionName: "undo",
      disabled: !editor.can().undo(),
    },
    {
      Icon: FaRedo,
      command: () => editor.chain().focus().redo().run(),
      optionName: "redo",
      disabled: !editor.can().redo(),
    },
  ];

  const handleTextSizeChange = (value) => {
    switch (value) {
      case "large": {
        editor.chain().focus().setHeading({ level: 2 }).run();
        break;
      }
      case "medium": {
        editor.chain().focus().setHeading({ level: 3 }).run();
        break;
      }
      case "normal": {
        editor.chain().focus().setParagraph().run();
        break;
      }
    }
  };

  return (
    <div className="flex items-center">
      <TextColorOption
        color={editor.getAttributes("textStyle").color}
        onChange={(color) => editor.chain().focus().setColor(color).run()}
      />
      <FontSizeOption onChange={handleTextSizeChange} />
      {options.map(({ Icon, command, active, optionName, disabled }) => (
        <button
          disabled={disabled}
          onClick={command}
          key={optionName}
          className={classnames("p-3 cursor-pointer hover:bg-gray-800", {
            "text-gray-400": !active,
            "text-black hover:text-white": active,
          })}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
};

export default FixedMenu;
