import React from "react";

import { Dropdown } from "@bigbinary/neetoui";
import { Link } from "neetoicons";

import { EDITOR_OPTIONS } from "common/constants";

import LinkOption from "./LinkOption";
import {
  getNodeType,
  getTextMenuDropdownOptions,
  renderOptionButton,
} from "./utils";

import Mentions from "../../CustomExtensions/Mention";
import EmojiOption from "../Fixed/EmojiOption";
import { buildMenuOptions } from "../Fixed/utils";

const Options = ({
  editor,
  options,
  mentions,
  tooltips,
  setIsInvalidLink,
  isLinkOptionActive,
  setIsLinkOptionActive,
  setMediaUploader,
  handleUploadAttachments,
  isEmojiPickerActive,
  setIsEmojiPickerActive,
  setIsEmbedModalOpen,
}) => {
  const { Menu, MenuItem } = Dropdown;

  const dropdownOptions = getTextMenuDropdownOptions({ editor });
  const nodeType = getNodeType(dropdownOptions);
  const isEmojiActive = options.includes(EDITOR_OPTIONS.EMOJI);
  const isLinkActive = options.includes(EDITOR_OPTIONS.LINK);
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
      {isEmojiActive && (
        <EmojiOption
          editor={editor}
          isActive={isEmojiPickerActive}
          setActive={setIsEmojiPickerActive}
          tooltipContent={tooltips.emoji || "Emoji"}
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
          tooltip: tooltips.link || "Link",
        })}
      <Mentions
        editor={editor}
        mentions={mentions}
        tooltipContent={tooltips.mention || "Mention"}
      />
    </>
  );
};

export default Options;
