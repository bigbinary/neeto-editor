import React from "react";

import DynamicVariables from "@bigbinary/neeto-molecules/DynamicVariables";
import classnames from "classnames";
import { isNotEmpty } from "neetocommons/pure";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import { EDITOR_OPTIONS } from "common/constants";

import EmojiOption from "./EmojiOption";
import FontSizeOption from "./FontSizeOption";
import LinkOption from "./LinkOption";
import TableActions from "./TableActions";
import TableOption from "./TableOption";
import {
  buildMenuOptions,
  buildOptionsFromAddonCommands,
  renderOptionButton,
} from "./utils";

import Mentions from "../../CustomExtensions/Mention";

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
  const isTableActive = options.includes(EDITOR_OPTIONS.TABLE);
  const addonCommandOptions = buildOptionsFromAddonCommands({
    editor,
    commands: addonCommands,
  });

  const handleVariableClick = item => {
    const { category, key } = item;
    const variableName = category ? `${category}.${key}` : key;
    editor.chain().focus().setVariable({ label: variableName }).run();
  };

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
        {isTableActive && (
          <TableOption
            editor={editor}
            tooltipContent={tooltips.table || t("menu.table")}
          />
        )}
        {miscOptions.map(renderOptionButton)}
        <Mentions
          editor={editor}
          mentions={mentions}
          tooltipContent={tooltips.mention || t("menu.mention")}
        />
        {addonCommandOptions.map(renderOptionButton)}
        <TableActions
          editor={editor}
          tooltipContent={tooltips.table || t("menu.table")}
        />
        {children}
        <div className="neeto-editor-fixed-menu__right-options">
          {rightOptions.map(renderOptionButton)}
        </div>
      </div>
      {!isEmpty(variables) && (
        <div className="neeto-editor-fixed-menu__variables">
          <DynamicVariables
            variables={variables}
            dropdownProps={{
              buttonSize: "small",
              buttonProps: {
                tooltipProps: {
                  content: t("menu.variables"),
                  position: "bottom",
                },
              },
            }}
            onVariableClick={handleVariableClick}
          />
        </div>
      )}
    </div>
  );
};

export default Fixed;
