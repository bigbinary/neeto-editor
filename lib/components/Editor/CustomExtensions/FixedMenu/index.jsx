import { EDITOR_OPTIONS } from "constants/common";

import React, { useState } from "react";

import MenuButton from "components/Common/MenuButton";
import Modal from "components/Common/Modal";
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
} from "neetoicons";
import { capitalize } from "utils/common";

import EmojiOption from "./EmojiOption";
import FontSizeOption from "./FontSizeOption";
import LinkOption from "./LinkOption";
import TextColorOption from "./TextColorOption";

import { getImageMenuOptions } from "../BubbleMenu/helpers";
import ImageEditor from "../Image/ImageEditor";
import Mentions from "../Mention";
import Variables from "../Variable";

const FixedMenu = ({
  editor,
  variables,
  setImageUploadVisible,
  options,
  mentions,
  showImageInMention,
}) => {
  const [isImageEditorModalOpen, setIsImageEditorModalOpen] = useState(false);
  const selectedNode = editor && editor.view.state.selection.node;
  const isImageNodeSelected =
    selectedNode && selectedNode.type.name === "image";

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
  ].filter(item => options.includes(item.optionName));

  const blockStyleOptions = [
    {
      Icon: Quote,
      command: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive("blockquote"),
      optionName: "block-quote",
      highlight: true,
    },
    {
      Icon: Code,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      active: editor.isActive("codeBlock"),
      optionName: "code-block",
      highlight: true,
    },
    {
      Icon: Image,
      command: () => setImageUploadVisible(true),
      active: editor.isActive("imageUpload"),
      optionName: "image-upload",
    },
  ].filter(item => options.includes(item.optionName));

  const listStyleOptions = [
    {
      Icon: ListDot,
      command: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
      optionName: "bullet-list",
      highlight: true,
    },
    {
      Icon: ListNumber,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      optionName: "ordered-list",
      highlight: true,
    },
  ].filter(item => options.includes(item.optionName));

  const fontSizeOptions = options.filter(option => option.match(/^h[1-6]$/));
  const isTextColorActive = options.includes(EDITOR_OPTIONS.FONT_COLOR);
  const isFontSizeActive = fontSizeOptions.length > 0;
  const isEmojiActive = options.includes(EDITOR_OPTIONS.EMOJI);
  const isLinkActive = options.includes(EDITOR_OPTIONS.LINK);

  const renderOptionButton = (
    { Icon, command, active, optionName, highlight },
    index
  ) => (
    <MenuButton
      key={index}
      icon={Icon}
      iconActive={active}
      highlight={highlight}
      onClick={command}
      tooltipProps={{
        content: capitalize(optionName),
        position: "bottom",
        delay: [500],
      }}
      data-cy={`neeto-editor-fixed-menu-${optionName}-option`}
    />
  );

  return (
    <div className="neeto-editor-fixed-menu">
      {isFontSizeActive && (
        <FontSizeOption editor={editor} options={fontSizeOptions} />
      )}
      {fontStyleOptions.map(renderOptionButton)}
      {isTextColorActive && (
        <TextColorOption
          color={editor.getAttributes("textStyle").color}
          onChange={color => editor.chain().focus().setColor(color).run()}
        />
      )}
      {isEmojiActive && <EmojiOption editor={editor} />}
      {isLinkActive && <LinkOption editor={editor} />}
      {blockStyleOptions.map(renderOptionButton)}
      {listStyleOptions.map(renderOptionButton)}
      {isImageNodeSelected &&
        getImageMenuOptions({
          editor,
          isImageEditorModalOpen,
          setIsImageEditorModalOpen,
        }).map(({ Icon, command, active, optionName }, index) => (
          <MenuButton
            key={index}
            icon={Icon}
            iconActive={active}
            onClick={command}
            tooltipProps={{
              content: capitalize(optionName),
              position: "bottom",
              delay: [500],
            }}
            data-cy={`neeto-editor-fixed-menu-${optionName}-option`}
          />
        ))}
      <div className="neeto-editor-fixed-menu-addons">
        <Variables editor={editor} variables={variables} />
        <Mentions
          editor={editor}
          mentions={mentions}
          showImageInMention={showImageInMention}
        />
      </div>
      <Modal
        isOpen={isImageEditorModalOpen}
        onClose={() => setIsImageEditorModalOpen(false)}
      >
        <div className="neeto-editor-image-uploader">
          <div className="neeto-editor-image-uploader__content">
            <ImageEditor
              editor={editor}
              onClose={() => setIsImageEditorModalOpen(false)}
              url={selectedNode?.attrs.src}
              alt={selectedNode?.attrs.alt}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FixedMenu;
