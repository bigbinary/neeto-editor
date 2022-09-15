import { EDITOR_OPTIONS } from "constants/common";

import React, { useState } from "react";

import MenuButton from "components/Common/MenuButton";
import Modal from "components/Common/Modal";
import { capitalize } from "utils/common";

import EmojiOption from "./EmojiOption";
import FontSizeOption from "./FontSizeOption";
import LinkOption from "./LinkOption";
import TextColorOption from "./TextColorOption";
import { buildMenuOptions } from "./utils";

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

  const {
    font: fontStyleOptions,
    block: blockStyleOptions,
    list: listStyleOptions,
  } = buildMenuOptions({ editor, options, setImageUploadVisible });
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
