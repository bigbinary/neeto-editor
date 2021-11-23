import React from "react";
import {
  TextBold,
  TextItalic,
  Underline,
  TextCross,
  Link,
  Code,
  ListDot,
  ListNumber,
  Image,
  Quote,
  Undo,
  Redo,
} from "@bigbinary/neeto-icons";

import TextColorOption from "./TextColorOption";
import FontSizeOption from "./FontSizeOption";

import { ICON_COLOR_ACTIVE, ICON_COLOR_INACTIVE } from "./constants";
import sharedState from "../../sharedState";
import Variables from "../Variable";

const FixedMenu = ({ editor, variables }) => {
  if (!editor) {
    return null;
  }

  const fontStyleOptions = [
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
      Icon: Underline,
      command: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
      optionName: "underline",
      size: 27,
    },
    {
      Icon: TextCross,
      command: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
      optionName: "strike",
    },
  ];

  const blockStyleOptions = [
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
      Icon: Quote,
      command: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive("blockquote"),
      optionName: "block-quote",
    },
    {
      Icon: Code,
      command: () => editor.chain().focus().toggleCode().run(),
      active: editor.isActive("code"),
      optionName: "code",
    },
    {
      Icon: Image,
      command: ({ range }) => {
        sharedState.showImageUpload = true;
        sharedState.range = range;
      },
      optionName: "image-upload",
    },
  ];

  const listStyleOptions = [
    {
      Icon: ListDot,
      command: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
      optionName: "bullet-list",
    },
    {
      Icon: ListNumber,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      optionName: "ordered-list",
    },
  ];

  const editorOptions = [
    {
      Icon: Undo,
      command: () => editor.chain().focus().undo().run(),
      optionName: "undo",
      disabled: !editor.can().undo(),
      active: editor.can().undo(),
    },
    {
      Icon: Redo,
      command: () => editor.chain().focus().redo().run(),
      optionName: "redo",
      disabled: !editor.can().redo(),
      active: editor.can().redo(),
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

  const renderOptionButton = ({
    Icon,
    command,
    active,
    optionName,
    disabled,
    ...rest
  }) => (
    <button
      disabled={disabled}
      onClick={command}
      key={optionName}
      className="p-3 transition-colors cursor-pointer editor-fixed-menu--item"
    >
      <Icon
        color={active ? ICON_COLOR_ACTIVE : ICON_COLOR_INACTIVE}
        {...rest}
      />
    </button>
  );

  return (
    <div className="flex items-center space-x-6 border-t border-l border-r editor-fixed-menu--root">
      <div className="flex">
        <TextColorOption
          color={editor.getAttributes("textStyle").color}
          onChange={(color) => editor.chain().focus().setColor(color).run()}
        />
        <FontSizeOption onChange={handleTextSizeChange} />
        {fontStyleOptions.map(renderOptionButton)}
      </div>
      {[blockStyleOptions, listStyleOptions, editorOptions].map(
        (optionGroup, index) => (
          <div className="flex" key={index}>
            {optionGroup.map(renderOptionButton)}
          </div>
        )
      )}
      <div className="flex justify-end flex-1">
        <Variables editor={editor} variables={variables} />
      </div>
    </div>
  );
};

export default FixedMenu;
