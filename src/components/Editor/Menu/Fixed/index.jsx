import React, { useEffect, useMemo, useRef, useState } from "react";

import classNames from "classnames";
import { EDITOR_OPTIONS } from "common/constants";
import { isNotEmpty } from "neetocist";
import DynamicVariables from "neetomolecules/DynamicVariables";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import EmbedOption from "components/Editor/CustomExtensions/Embeds";
import MediaUploader from "components/Editor/MediaUploader";

import EmojiOption from "./EmojiOption";
import FontSizeOption from "./FontSizeOption";
import LinkAddPopOver from "./LinkAddPopOver";
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
  isIndependant = true,
  className,
  tooltips = {},
  attachmentProps,
  isEmojiPickerActive,
  setIsEmojiPickerActive,
  children,
  openLinkInNewTab,
}) => {
  const [focusedButtonIndex, setFocusedButtonIndex] = useState(0);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [isAddLinkActive, setIsAddLinkActive] = useState(false);

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
    attachmentProps,
    setIsEmbedModalOpen,
    setIsAddLinkActive,
  });
  const fontSizeOptions = options.filter(option => option.match(/^h[1-6]$/));
  const isFontSizeActive = isNotEmpty(fontSizeOptions);
  const isEmojiActive = options.includes(EDITOR_OPTIONS.EMOJI);
  const isTableActive = options.includes(EDITOR_OPTIONS.TABLE);
  const isTextColorOptionActive = options.includes(EDITOR_OPTIONS.TEXT_COLOR);
  const isEmbedOptionActive = options.includes(EDITOR_OPTIONS.VIDEO_EMBED);
  const isMediaUploaderActive =
    options.includes(EDITOR_OPTIONS.IMAGE_UPLOAD) ||
    options.includes(EDITOR_OPTIONS.VIDEO_UPLOAD);

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
        {isNotEmpty(rightOptions) && (
          <div className="neeto-editor-fixed-menu__right-options">
            {rightOptions.map(renderOptionButton)}
          </div>
        )}
        {isFontSizeActive && (
          <FontSizeOption
            {...{ editor }}
            tooltipContent={tooltips.fontSize || t("neetoEditor.menu.fontSize")}
          />
        )}
        <div className="neeto-editor-fixed-menu__wrapper__button-group">
          {fontStyleOptions.map(renderOptionButton)}
        </div>
        <div className="neeto-editor-fixed-menu__wrapper--collapsible">
          <div className="neeto-editor-fixed-menu__wrapper__button-group">
            {listStyleOptions.map(renderOptionButton)}
          </div>
          <div className="neeto-editor-fixed-menu__wrapper__button-group">
            {blockStyleOptions.map(renderOptionButton)}
          </div>
          <div className="neeto-editor-fixed-menu__wrapper__button-group">
            {isTableActive && (
              <TableOption
                {...{ editor }}
                tooltipContent={tooltips.table || t("neetoEditor.menu.table")}
              />
            )}
            {miscOptions.map(renderOptionButton)}
            {isTextColorOptionActive && (
              <TextColorOption
                {...{ editor }}
                tooltipContent={
                  tooltips.textColor || t("neetoEditor.menu.textColor")
                }
              />
            )}
            {isEmojiActive && (
              <EmojiOption
                {...{ editor }}
                isActive={isEmojiPickerActive}
                setActive={setIsEmojiPickerActive}
                tooltipContent={tooltips.emoji || t("neetoEditor.menu.emoji")}
              />
            )}
            <Mentions
              {...{ editor, mentions }}
              tooltipContent={tooltips.mention || t("neetoEditor.menu.mention")}
            />
            {addonCommandOptions.map(renderOptionButton)}
          </div>
          {children}
        </div>
      </div>
      {!isEmpty(variables) && (
        <div
          className="neeto-editor-fixed-menu__variables"
          data-cy="neeto-editor-fixed-menu-variables"
        >
          <DynamicVariables
            {...{ variables }}
            dropdownProps={{
              buttonSize: "small",
              buttonProps: {
                tooltipProps: {
                  content: t("neetoEditor.menu.dynamicVariables"),
                  position: "bottom",
                },
              },
            }}
            onVariableClick={handleVariableClick}
          />
        </div>
      )}
      {isAddLinkActive && (
        <LinkAddPopOver
          {...{
            editor,
            isAddLinkActive,
            openLinkInNewTab,
            setIsAddLinkActive,
          }}
        />
      )}
      {isMediaUploaderActive && (
        <MediaUploader
          {...{ editor, mediaUploader, unsplashApiKey }}
          onClose={() => setMediaUploader({ image: false, video: false })}
        />
      )}
      {isEmbedOptionActive && (
        <EmbedOption {...{ editor, isEmbedModalOpen, setIsEmbedModalOpen }} />
      )}
    </div>
  );
};

export default Fixed;
