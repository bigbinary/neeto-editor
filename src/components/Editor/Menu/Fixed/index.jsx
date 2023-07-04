import React, { useState } from "react";

import DynamicVariables from "@bigbinary/neeto-molecules/DynamicVariables";
import classNames from "classnames";
import { isNotEmpty } from "neetocommons/pure";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";
import { isEmpty, not } from "ramda";
import { useTranslation } from "react-i18next";

import { EDITOR_OPTIONS } from "common/constants";
import EmbedOption from "components/Editor/CustomExtensions/Embeds";
import MediaUploader from "components/Editor/MediaUploader";

import EmojiOption from "./EmojiOption";
import FontSizeOption from "./FontSizeOption";
import LinkOption from "./LinkOption";
import TableActions from "./TableActions";
import TableOption from "./TableOption";
import TextColorOption from "./TextColorOption";
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
  mediaUploader,
  unsplashApiKey,
  addonCommands = [],
  isMenuCollapsible = false,
  isIndependant = true,
  className,
  tooltips = {},
  handleUploadAttachments,
  isEmojiPickerActive,
  setIsEmojiPickerActive,
  children,
}) => {
  const { t } = useTranslation();
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);

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
  const isTextColorOptionActive = options.includes(EDITOR_OPTIONS.TEXT_COLOR);
  const isEmbedOptionActive = options.includes(EDITOR_OPTIONS.VIDEO_EMBED);
  const isMediaUploaderActive = options.includes(
    EDITOR_OPTIONS.IMAGE_UPLOAD || EDITOR_OPTIONS.VIDEO_UPLOAD
  );

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
      className={classNames("neeto-editor-fixed-menu", {
        "neeto-editor-fixed-menu--independant": isIndependant,
        [className]: className,
      })}
    >
      <div className="neeto-editor-fixed-menu__wrapper">
        {isFontSizeActive && (
          <FontSizeOption
            editor={editor}
            tooltipContent={tooltips.fontSize || t("menu.fontSize")}
          />
        )}
        {fontStyleOptions.map(renderOptionButton)}
        <TableActions
          editor={editor}
          tooltipContent={tooltips.table || t("menu.table")}
        />
        {(isMenuExpanded || not(isMenuCollapsible)) && (
          <div
            className={classNames(
              "neeto-editor-fixed-menu__wrapper--collapsible",
              {
                "neeto-editor-fixed-menu__wrapper--collapsible--fade":
                  isMenuCollapsible,
              }
            )}
          >
            {listStyleOptions.map(renderOptionButton)}
            {blockStyleOptions.map(renderOptionButton)}
            {isTextColorOptionActive && (
              <TextColorOption
                editor={editor}
                tooltipContent={tooltips.textColor || t("menu.textColor")}
              />
            )}
            {isEmojiActive && (
              <EmojiOption
                editor={editor}
                isActive={isEmojiPickerActive}
                setActive={setIsEmojiPickerActive}
                tooltipContent={tooltips.emoji || t("menu.emoji")}
              />
            )}
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
            {isMediaUploaderActive && (
              <MediaUploader
                editor={editor}
                mediaUploader={mediaUploader}
                unsplashApiKey={unsplashApiKey}
                onClose={() => setMediaUploader({ image: false, video: false })}
              />
            )}
            {isEmbedOptionActive && (
              <EmbedOption
                editor={editor}
                isEmbedModalOpen={isEmbedModalOpen}
                setIsEmbedModalOpen={setIsEmbedModalOpen}
              />
            )}
            {miscOptions.map(renderOptionButton)}
            <Mentions
              editor={editor}
              mentions={mentions}
              tooltipContent={tooltips.mention || t("menu.mention")}
            />
            {addonCommandOptions.map(renderOptionButton)}
            {isNotEmpty(rightOptions) && (
              <div className="neeto-editor-fixed-menu__right-options">
                {rightOptions.map(renderOptionButton)}
              </div>
            )}
            {children}
          </div>
        )}
        {isMenuCollapsible && (
          <Button
            className="neeto-editor-fixed-menu__item"
            data-cy="neeto-editor-fixed-menu-arrow"
            icon={isMenuExpanded ? Left : Right}
            style="text"
            tooltipProps={{
              content: isMenuExpanded ? t("menu.collapse") : t("menu.expand"),
              position: "bottom",
            }}
            onClick={() => setIsMenuExpanded(not)}
          />
        )}
      </div>
      {!isEmpty(variables) && (
        <div className="neeto-editor-fixed-menu__variables">
          <DynamicVariables
            variables={variables}
            dropdownProps={{
              buttonSize: "small",
              buttonProps: {
                tooltipProps: {
                  content: t("menu.dynamicVariables"),
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
