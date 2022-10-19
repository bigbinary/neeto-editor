import React, { useState } from "react";

import Tippy from "@tippyjs/react";
import { Down, Link } from "neetoicons";

import { EDITOR_OPTIONS } from "constants/common";

import LinkOption from "./LinkOption";
import {
  getNodeType,
  getTextMenuDropdownOptions,
  renderOptionButton,
} from "./utils";

import EmojiOption from "../FixedMenu/EmojiOption";
import Separator from "../FixedMenu/Separator";
import { buildMenuOptions } from "../FixedMenu/utils";

const TextOptions = ({
  editor,
  options,
  setIsInvalidLink,
  isLinkOptionActive,
  setIsLinkOptionActive,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownOptions = getTextMenuDropdownOptions({ editor });
  const nodeType = getNodeType(dropdownOptions);
  const isEmojiActive = options.includes(EDITOR_OPTIONS.EMOJI);
  const isLinkActive = options.includes(EDITOR_OPTIONS.LINK);
  const {
    font: fontStyleOptions,
    block: blockStyleOptions,
    list: listStyleOptions,
    misc: miscOptions,
  } = buildMenuOptions({ editor, options, setImageUploadVisible: () => {} });

  const handleAnimateInvalidLink = () => {
    setIsInvalidLink(true);
    setTimeout(() => {
      setIsInvalidLink(false);
    }, 1000);
  };

  const handleClose = () => setIsDropdownOpen(false);

  if (isLinkOptionActive) {
    return (
      <LinkOption
        editor={editor}
        handleClose={() => setIsLinkOptionActive(false)}
        handleAnimateInvalidLink={handleAnimateInvalidLink}
      />
    );
  }

  return (
    <>
      <Tippy
        arrow={false}
        interactive
        placement="bottom"
        visible={isDropdownOpen}
        onClickOutside={handleClose}
        content={
          <div className="neeto-editor-bubble-menu__dropdown">
            {dropdownOptions.map(({ optionName, command }) => (
              <button
                type="button"
                key={optionName}
                onClick={() => {
                  command();
                  handleClose();
                }}
                className="neeto-editor-bubble-menu__item neeto-editor-bubble-menu__dropdown-item"
              >
                {optionName}
              </button>
            ))}
          </div>
        }
      >
        <button
          type="button"
          onClick={() => setIsDropdownOpen(open => !open)}
          className="neeto-editor-bubble-menu__item neeto-editor-bubble-menu__dropdown-target"
        >
          {nodeType}
          <Down size={14} />
        </button>
      </Tippy>
      <Separator />
      {fontStyleOptions.map(renderOptionButton)}
      <Separator />
      {blockStyleOptions.map(renderOptionButton)}
      {isEmojiActive && <EmojiOption editor={editor} theme="dark" />}
      <Separator />
      {listStyleOptions.map(renderOptionButton)}
      <Separator />
      {isLinkActive &&
        renderOptionButton({
          Icon: Link,
          command: () => setIsLinkOptionActive(true),
          active: editor.isActive("link"),
          optionName: "link",
        })}
      {miscOptions.map(renderOptionButton)}
    </>
  );
};

export default TextOptions;
