import React from "react";

import classnames from "classnames";

import { EDITOR_OPTIONS } from "common/constants";

import EmojiOption from "./EmojiOption";
import FontSizeOption from "./FontSizeOption";
import LinkOption from "./LinkOption";
import {
  buildMenuOptions,
  buildOptionsFromAddonCommands,
  renderOptionButton,
} from "./utils";

import Mentions from "../../CustomExtensions/Mention";
import Variables from "../../CustomExtensions/Variable";

const Fixed = ({
  editor,
  options,
  mentions = [],
  variables = [],
  setMediaUploader,
  addonCommands = [],
  isIndependant = true,
  className,
  tooltips,
  handleUploadAttachments,
}) => {
  if (!editor) {
    return null;
  }

  const {
    font: fontStyleOptions,
    block: blockStyleOptions,
    list: listStyleOptions,
    misc: miscOptions,
    right: rightOptions,
  } = buildMenuOptions({
    tooltips,
    editor,
    options,
    setMediaUploader,
    handleUploadAttachments,
  });
  const fontSizeOptions = options.filter(option => option.match(/^h[1-6]$/));
  const isFontSizeActive = fontSizeOptions.length > 0;
  const isEmojiActive = options.includes(EDITOR_OPTIONS.EMOJI);
  const isLinkActive = options.includes(EDITOR_OPTIONS.LINK);
  const addonCommandOptions = buildOptionsFromAddonCommands({
    editor,
    commands: addonCommands,
  });

  return (
    <div
      className={classnames("neeto-editor-fixed-menu", {
        "neeto-editor-fixed-menu--independant": isIndependant,
        [className]: className,
      })}
    >
      <div className="neeto-editor-fixed-menu__wrapper">
        {isFontSizeActive && (
          <FontSizeOption editor={editor} tooltips={tooltips} />
        )}
        {fontStyleOptions.map(renderOptionButton)}
        {blockStyleOptions.map(renderOptionButton)}
        {isEmojiActive && <EmojiOption editor={editor} />}
        {listStyleOptions.map(renderOptionButton)}
        {isLinkActive && <LinkOption editor={editor} tooltips={tooltips} />}
        {miscOptions.map(renderOptionButton)}
        <Mentions editor={editor} mentions={mentions} tooltips={tooltips} />
        {addonCommandOptions.map(renderOptionButton)}
        <div className="neeto-editor-fixed-menu__right-options">
          {rightOptions.map(renderOptionButton)}
        </div>
      </div>
      <div className="neeto-editor-fixed-menu__variables">
        <Variables editor={editor} tooltips={tooltips} variables={variables} />
      </div>
    </div>
  );
};

export default Fixed;
