import React from "react";

import classnames from "classnames";
import { useTranslation } from "react-i18next";

import { EDITOR_OPTIONS } from "common/constants";
import { isNotEmpty } from "neetocommons/pure";

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
  tooltips = {},
  handleUploadAttachments,
  isEmojiPickerActive,
  setIsEmojiPickerActive,
  setIsEmbedModalOpen,
  children,
}) => {
  const { t } = useTranslation();

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
    setIsEmbedModalOpen,
  });
  const fontSizeOptions = options.filter(option => option.match(/^h[1-6]$/));
  const isFontSizeActive = isNotEmpty(fontSizeOptions);
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
          <FontSizeOption
            editor={editor}
            tooltipContent={tooltips.fontSize || t("menu.font-size")}
          />
        )}
        {fontStyleOptions.map(renderOptionButton)}
        {blockStyleOptions.map(renderOptionButton)}
        {isEmojiActive && (
          <EmojiOption
            editor={editor}
            isActive={isEmojiPickerActive}
            setActive={setIsEmojiPickerActive}
            tooltipContent={tooltips.emoji || t("menu.emoji")}
          />
        )}
        {listStyleOptions.map(renderOptionButton)}
        {isLinkActive && (
          <LinkOption
            editor={editor}
            tooltipContent={tooltips.link || t("menu.link")}
          />
        )}
        {miscOptions.map(renderOptionButton)}
        <Mentions
          editor={editor}
          mentions={mentions}
          tooltipContent={tooltips.mention || t("menu.mention")}
        />
        {addonCommandOptions.map(renderOptionButton)}
        {children}
        <div className="neeto-editor-fixed-menu__right-options">
          {rightOptions.map(renderOptionButton)}
        </div>
      </div>
      <div className="neeto-editor-fixed-menu__variables">
        <Variables
          editor={editor}
          tooltipContent={tooltips.variables || t("menu.variables")}
          variables={variables}
        />
      </div>
    </div>
  );
};

export default Fixed;
