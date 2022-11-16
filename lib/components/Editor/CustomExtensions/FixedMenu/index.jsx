import React from "react";

import { EDITOR_OPTIONS } from "common/constants";
import Modal from "components/Common/Modal";

import EmojiOption from "./EmojiOption";
import FontSizeOption from "./FontSizeOption";
import LinkOption from "./LinkOption";
import Separator from "./Separator";
import { buildMenuOptions, renderOptionButton } from "./utils";

import { getImageMenuOptions } from "../BubbleMenu/utils";
import ImageEditor from "../Image/ImageEditor";
import Mentions from "../Mention";
import Variables from "../Variable";

const FixedMenu = ({
  editor,
  options,
  mentions,
  variables,
  isImageUploadOpen,
  setIsImageUploadOpen,
}) => {
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
    misc: miscOptions,
    right: rightOptions,
  } = buildMenuOptions({ editor, options, setIsImageUploadOpen });
  const fontSizeOptions = options.filter(option => option.match(/^h[1-6]$/));
  const isFontSizeActive = fontSizeOptions.length > 0;
  const isEmojiActive = options.includes(EDITOR_OPTIONS.EMOJI);
  const isLinkActive = options.includes(EDITOR_OPTIONS.LINK);

  return (
    <div className="neeto-editor-fixed-menu">
      <div className="neeto-editor-fixed-menu__wrapper">
        {fontStyleOptions.map(renderOptionButton)}
        {isFontSizeActive && <FontSizeOption editor={editor} />}
        <Separator />
        {blockStyleOptions.map(renderOptionButton)}
        {isEmojiActive && <EmojiOption editor={editor} />}
        <Separator />
        {listStyleOptions.map(renderOptionButton)}
        {isImageNodeSelected &&
          getImageMenuOptions({
            editor,
            isImageUploadOpen,
            setIsImageUploadOpen,
          }).map(renderOptionButton)}
        <Separator />
        {isLinkActive && <LinkOption editor={editor} />}
        {miscOptions.map(renderOptionButton)}
        <Mentions editor={editor} mentions={mentions} />
        <div className="neeto-editor-fixed-menu__variables">
          <Variables editor={editor} variables={variables} />
        </div>
        <div className="neeto-editor-fixed-menu__right-options">
          {rightOptions.map(renderOptionButton)}
        </div>
        <Modal
          isOpen={isImageUploadOpen}
          onClose={() => setIsImageUploadOpen(false)}
        >
          <div className="neeto-editor-image-uploader">
            <div className="neeto-editor-image-uploader__content">
              <ImageEditor
                alt={selectedNode?.attrs.alt}
                editor={editor}
                url={selectedNode?.attrs.src}
                onClose={() => setIsImageUploadOpen(false)}
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default FixedMenu;
