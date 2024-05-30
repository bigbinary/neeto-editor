import React from "react";

import { EDITOR_OPTIONS } from "common/constants";
import { Link, Column } from "neetoicons";
import { Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import LinkOption from "./LinkOption";
import TableOption from "./TableOption";
import {
  getNodeType,
  getTextMenuDropdownOptions,
  renderOptionButton,
  buildBubbleMenuOptions,
} from "./utils";

import Mentions from "../../CustomExtensions/Mention";
import EmojiOption from "../Fixed/components/EmojiOption";
import TextColorOption from "../Fixed/components/TextColorOption";

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
  attachmentProps,
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
  } = buildBubbleMenuOptions({
    editor,
    options,
    setMediaUploader,
    tooltips,
    attachmentProps,
    setIsEmbedModalOpen,
    setIsAddLinkActive: setIsLinkOptionActive,
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
        {...{ editor, handleAnimateInvalidLink }}
        handleClose={() => setIsLinkOptionActive(false)}
      />
    );
  }

  if (isTableOptionActive) {
    return (
      <TableOption
        {...{ editor }}
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
          {...{ editor }}
          tooltipContent={tooltips.textColor || t("neetoEditor.menu.textColor")}
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
      {listStyleOptions.map(renderOptionButton)}
      {isLinkActive &&
        renderOptionButton({
          Icon: Link,
          command: () => setIsLinkOptionActive(true),
          active: editor.isActive("link"),
          optionName: "link",
          highlight: false,
          tooltip: tooltips.link || t("neetoEditor.menu.link"),
        })}
      {isTableActive &&
        renderOptionButton({
          Icon: Column,
          command: () => setIsTableOptionActive(true),
          active: editor.isActive("table"),
          optionName: "table",
          highlight: false,
          tooltip: tooltips.table || t("neetoEditor.menu.table"),
        })}
      <Mentions
        {...{ editor, mentions }}
        tooltipContent={tooltips.mention || t("neetoEditor.menu.mention")}
      />
      {children}
    </>
  );
};

export default Options;
