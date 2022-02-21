import React from "react";
import {
  TextBold,
  TextItalic,
  Underline,
  TextCross,
  Highlight,
  Code,
  ListDot,
  ListNumber,
  Image,
  Quote,
} from "@bigbinary/neeto-icons";
import ToolTip from "components/Common/ToolTip";
import { capitalize } from "utils/common";

import TextColorOption from "./TextColorOption";
import FontSizeOption from "./FontSizeOption";
import Variables from "../Variable";
import Mentions from "../Mention";
import LinkOption from "./LinkOption";
import EmojiOption from "./EmojiOption";

import {
  MENU_ICON_SIZE,
  ICON_COLOR_ACTIVE,
  ICON_COLOR_INACTIVE,
} from "./constants";

const FixedMenu = ({
  editor,
  variables,
  setImageUploadVisible,
  options,
  mentions,
  showImageInMention,
}) => {
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
    },
    {
      Icon: TextCross,
      command: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
      optionName: "strike",
    },
    {
      Icon: Highlight,
      command: () => editor.chain().focus().toggleHighlight().run(),
      active: editor.isActive("highlight"),
      optionName: "highlight",
    },
  ].filter((item) => options.includes(item.optionName));

  const blockStyleOptions = [
    {
      Icon: Quote,
      command: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive("blockquote"),
      optionName: "block-quote",
    },
    {
      Icon: Code,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      active: editor.isActive("codeBlock"),
      optionName: "code-block",
    },
    {
      Icon: Image,
      command: () => setImageUploadVisible(true),
      optionName: "image-upload",
    },
  ].filter((item) => options.includes(item.optionName));

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
  ].filter((item) => options.includes(item.optionName));

  const isTextColorActive = options.includes("font-color");
  const isFontSizeActive = options.includes("font-size");
  const isEmojiActive = options.includes("emoji");
  const isLinkActive = options.includes("link");

  const renderOptionButton = ({
    Icon,
    command,
    active,
    optionName,
    disabled,
    ...rest
  }) => (
    <ToolTip content={capitalize(optionName)} position="bottom">
      <button
        disabled={disabled}
        onClick={command}
        key={optionName}
        className="neeto-editor-fixed-menu__item"
        type="button"
        data-cy={`neeto-editor-fixed-menu-${optionName}-option`}
      >
        <Icon
          color={active ? ICON_COLOR_ACTIVE : ICON_COLOR_INACTIVE}
          size={MENU_ICON_SIZE}
          {...rest}
        />
      </button>
    </ToolTip>
  );

  return (
    <div className="neeto-editor-fixed-menu">
      {isFontSizeActive && <FontSizeOption editor={editor} />}
      {fontStyleOptions.map(renderOptionButton)}
      {isTextColorActive && (
        <TextColorOption
          color={editor.getAttributes("textStyle").color}
          onChange={(color) => editor.chain().focus().setColor(color).run()}
        />
      )}
      {isEmojiActive && <EmojiOption editor={editor} />}
      {isLinkActive && <LinkOption editor={editor} />}
      {blockStyleOptions.map(renderOptionButton)}
      {listStyleOptions.map(renderOptionButton)}
      <div className="neeto-editor-fixed-menu-addons">
        <Variables editor={editor} variables={variables} />
        <Mentions
          editor={editor}
          mentions={mentions}
          showImageInMention={showImageInMention}
        />
      </div>
    </div>
  );
};

export default FixedMenu;
