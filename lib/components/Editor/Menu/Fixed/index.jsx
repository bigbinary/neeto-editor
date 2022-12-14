import React from "react";

import classnames from "classnames";
import { isEmpty } from "ramda";

import { EDITOR_OPTIONS } from "common/constants";

import EmojiOption from "./EmojiOption";
import FontSizeOption from "./FontSizeOption";
import LinkOption from "./LinkOption";
import Separator from "./Separator";
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
  } = buildMenuOptions({ editor, options, setMediaUploader });
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
        {isFontSizeActive && <FontSizeOption editor={editor} />}
        {fontStyleOptions.map(renderOptionButton)}
        {(isFontSizeActive || !isEmpty(fontSizeOptions)) && <Separator />}
        {blockStyleOptions.map(renderOptionButton)}
        {isEmojiActive && <EmojiOption editor={editor} />}
        {(isEmojiActive || !isEmpty(blockStyleOptions)) && <Separator />}
        {listStyleOptions.map(renderOptionButton)}
        {!isEmpty(listStyleOptions) && <Separator />}
        {isLinkActive && <LinkOption editor={editor} />}
        {miscOptions.map(renderOptionButton)}
        <Mentions editor={editor} mentions={mentions} />
        {addonCommandOptions.map(renderOptionButton)}
        <div className="neeto-editor-fixed-menu__right-options">
          {rightOptions.map(renderOptionButton)}
        </div>
      </div>
      <div className="neeto-editor-fixed-menu__variables">
        <Variables editor={editor} variables={variables} />
      </div>
    </div>
  );
};

export default Fixed;
