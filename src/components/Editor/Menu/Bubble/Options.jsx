import React from "react";

import { Link, NeetoChangelog } from "neetoicons";
import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import { EDITOR_OPTIONS } from "common/constants";

import LinkOption from "./LinkOption";
import TableOption from "./TableOption";
import {
  getNodeType,
  getTextMenuDropdownOptions,
  renderOptionButton,
} from "./utils";

import Mentions from "../../CustomExtensions/Mention";
import EmojiOption from "../Fixed/EmojiOption";
import TextColorOption from "../Fixed/TextColorOption";
import { buildMenuOptions } from "../Fixed/utils";

const Options = ({
  editor,
  options,
  mentions,
  tooltips,
  setIsInvalidLink,
  isLinkOptionActive,
  isTableOptionActive,
  setIsLinkOptionActive,
  setIsTableOptionActive,
  setMediaUploader,
  handleUploadAttachments,
  isEmojiPickerActive,
  setIsEmojiPickerActive,
  setIsEmbedModalOpen,
  children,
}) => {
  const { t } = useTranslation();
  const { Menu, MenuItem } = Dropdown;

  const dropdownOptions = getTextMenuDropdownOptions({ editor });
  const nodeType = getNodeType(dropdownOptions);
  const isEmojiActive = options.includes(EDITOR_OPTIONS.EMOJI);
  const isTextColorOptionActive = options.includes(EDITOR_OPTIONS.TEXT_COLOR);
  const isLinkActive = options.includes(EDITOR_OPTIONS.LINK);
  const isTableActive = options.includes(EDITOR_OPTIONS.TABLE);

  const {
    font: fontStyleOptions,
    block: blockStyleOptions,
    list: listStyleOptions,
  } = buildMenuOptions({
    editor,
    options,
    setMediaUploader,
    tooltips,
    handleUploadAttachments,
    setIsEmbedModalOpen,
  });

  const handleAnimateInvalidLink = () => {
    setIsInvalidLink(true);
    setTimeout(() => {
      setIsInvalidLink(false);
    }, 1000);
  };

  if (isLinkOptionActive) {
    return (
      <LinkOption
        editor={editor}
        handleAnimateInvalidLink={handleAnimateInvalidLink}
        handleClose={() => setIsLinkOptionActive(false)}
      />
    );
  }

  if (isTableOptionActive) {
    return (
      <TableOption
        editor={editor}
        handleClose={() => setIsTableOptionActive(false)}
      />
    );
  }

  return (
    <>
      <Dropdown
        buttonSize="small"
        buttonStyle="text"
        label={nodeType}
        strategy="fixed"
      >
        <Menu>
          {dropdownOptions.map(({ optionName, command }) => (
            <MenuItem.Button key={optionName} onClick={command}>
              {optionName}
            </MenuItem.Button>
          ))}
        </Menu>
      </Dropdown>
      {fontStyleOptions.map(renderOptionButton)}
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
      {listStyleOptions.map(renderOptionButton)}
      {isLinkActive &&
        renderOptionButton({
          Icon: Link,
          command: () => setIsLinkOptionActive(true),
          active: editor.isActive("link"),
          optionName: "link",
          highlight: false,
          tooltip: tooltips.link || t("menu.link"),
        })}
      {isTableActive &&
        renderOptionButton({
          Icon: NeetoChangelog,
          command: () => setIsTableOptionActive(true),
          active: editor.isActive("table"),
          optionName: "table",
          highlight: false,
          tooltip: tooltips.table || t("menu.table"),
        })}
      <Mentions
        editor={editor}
        mentions={mentions}
        tooltipContent={tooltips.mention || t("menu.mention")}
      />
      {children}
    </>
  );
};

export default Options;
