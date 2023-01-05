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
  setIsInvalidLink,
  isLinkOptionActive,
  setIsLinkOptionActive,
  setMediaUploader,
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
  } = buildMenuOptions({ editor, options, setMediaUploader });

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
      <Dropdown buttonStyle="text" label={nodeType}>
        <Menu>
          {dropdownOptions.map(({ optionName, command }) => (
            <MenuItem.Button
              key={optionName}
              onClick={() => {
                command();
              }}
            >
              {optionName}
            </MenuItem.Button>
          ))}
        </Menu>
      </Dropdown>
      {fontStyleOptions.map(renderOptionButton)}
      {blockStyleOptions.map(renderOptionButton)}
      {isEmojiActive && <EmojiOption editor={editor} theme="dark" />}
      {listStyleOptions.map(renderOptionButton)}
      {isLinkActive &&
        renderOptionButton({
          Icon: Link,
          command: () => setIsLinkOptionActive(true),
          active: editor.isActive("link"),
          optionName: "link",
          highlight: false,
        })}
      <Mentions editor={editor} mentions={mentions} menuType="bubble" />
    </>
  );
};

export default Options;
