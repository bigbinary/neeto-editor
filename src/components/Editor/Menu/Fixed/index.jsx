import React, { useEffect, useMemo, useRef, useState } from "react";

import classNames from "classnames";
import { isNotEmpty } from "neetocommons/pure";
import { Left, Right } from "neetoicons";
import DynamicVariables from "neetomolecules/DynamicVariables";
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
  const [focusedButtonIndex, setFocusedButtonIndex] = useState(0);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);

  const menuRef = useRef(null);

  const { t } = useTranslation();

  const handleArrowNavigation = event => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setFocusedButtonIndex(prevIndex => (prevIndex + 1) % menuButtons.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setFocusedButtonIndex(
        prevIndex => (prevIndex - 1 + menuButtons.length) % menuButtons.length
      );
    }
  };

  const menuButtons = useMemo(
    () => menuRef.current?.querySelectorAll(".neeto-editor-fixed-menu__item"),
    [menuRef.current]
  );

  useEffect(() => {
    menuButtons?.[focusedButtonIndex].focus();
  }, [focusedButtonIndex]);

  useEffect(() => {
    menuButtons?.forEach(menuItem =>
      menuItem.addEventListener("keydown", handleArrowNavigation)
    );

    return () =>
      menuButtons?.forEach(menuItem =>
        menuItem.removeEventListener("keydown", handleArrowNavigation)
      );
  }, [menuButtons]);

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
      ref={menuRef}
      className={classNames("neeto-editor-fixed-menu", {
        "neeto-editor-fixed-menu--independant": isIndependant,
        [className]: className,
      })}
    >
      <div
        className="neeto-editor-fixed-menu__wrapper"
        data-cy="neeto-editor-fixed-menu-wrapper"
        ref={menuRef}
      >
        {isFontSizeActive && (
          <FontSizeOption
            {...{ editor }}
            tooltipContent={tooltips.fontSize || t("menu.fontSize")}
          />
        )}
        {isFontSizeActive && <div className="vertical-divider" />}
        <div className="neeto-editor-fixed-menu__wrapper__button-group">
          {fontStyleOptions.map(renderOptionButton)}
          <TableActions
            {...{ editor }}
            tooltipContent={tooltips.table || t("menu.table")}
          />
        </div>
        {isNotEmpty(fontStyleOptions) && <div className="vertical-divider" />}
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
            <div className="neeto-editor-fixed-menu__wrapper__button-group">
              {listStyleOptions.map(renderOptionButton)}
            </div>
            {isNotEmpty(listStyleOptions) && (
              <div className="vertical-divider" />
            )}
            <div className="neeto-editor-fixed-menu__wrapper__button-group">
              {blockStyleOptions.map(renderOptionButton)}
            </div>
            {isNotEmpty(blockStyleOptions) && (
              <div className="vertical-divider" />
            )}
            <div className="neeto-editor-fixed-menu__wrapper__button-group">
              {isLinkActive && (
                <LinkOption
                  {...{ editor, menuRef }}
                  tooltipContent={tooltips.link || t("menu.link")}
                />
              )}
              {isTableActive && (
                <TableOption
                  {...{ editor }}
                  tooltipContent={tooltips.table || t("menu.table")}
                />
              )}
              {miscOptions.map(renderOptionButton)}
              {isTextColorOptionActive && (
                <TextColorOption
                  {...{ editor }}
                  tooltipContent={tooltips.textColor || t("menu.textColor")}
                />
              )}
              {isEmojiActive && (
                <EmojiOption
                  {...{ editor }}
                  isActive={isEmojiPickerActive}
                  setActive={setIsEmojiPickerActive}
                  tooltipContent={tooltips.emoji || t("menu.emoji")}
                />
              )}
              {isMediaUploaderActive && (
                <MediaUploader
                  {...{ editor, mediaUploader, unsplashApiKey }}
                  onClose={() =>
                    setMediaUploader({ image: false, video: false })
                  }
                />
              )}
              {isEmbedOptionActive && (
                <EmbedOption
                  {...{ editor, isEmbedModalOpen, setIsEmbedModalOpen }}
                />
              )}
              <Mentions
                {...{ editor, mentions }}
                tooltipContent={tooltips.mention || t("menu.mention")}
              />
              {addonCommandOptions.map(renderOptionButton)}
            </div>
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
            {...{ variables }}
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
