import React, { useState } from "react";

import Tippy from "@tippyjs/react";
import { Down, Link } from "neetoicons";

import { EDITOR_OPTIONS } from "common/constants";
import { noop } from "utils/common";

import LinkOption from "./LinkOption";
import {
  getNodeType,
  getTextMenuDropdownOptions,
  renderOptionButton,
} from "./utils";

import EmojiOption from "../FixedMenu/EmojiOption";
import Separator from "../FixedMenu/Separator";
import { buildMenuOptions } from "../FixedMenu/utils";
import Mentions from "../Mention";

const Options = ({
  editor,
  options,
  mentions,
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
  } = buildMenuOptions({ editor, options, setIsImageUploadVisible: noop });

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
        handleAnimateInvalidLink={handleAnimateInvalidLink}
        handleClose={() => setIsLinkOptionActive(false)}
      />
    );
  }

  return (
    <>
      <Tippy
        interactive
        arrow={false}
        placement="bottom"
        visible={isDropdownOpen}
        content={
          <div className="neeto-editor-bubble-menu__dropdown">
            {dropdownOptions.map(({ optionName, command }) => (
              <button
                className="neeto-editor-bubble-menu__item neeto-editor-bubble-menu__dropdown-item"
                key={optionName}
                type="button"
                onClick={() => {
                  command();
                  handleClose();
                }}
              >
                {optionName}
              </button>
            ))}
          </div>
        }
        onClickOutside={handleClose}
      >
        <button
          className="neeto-editor-bubble-menu__item neeto-editor-bubble-menu__dropdown-target"
          type="button"
          onClick={() => setIsDropdownOpen(open => !open)}
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
          highlight: false,
        })}
      <Mentions editor={editor} mentions={mentions} menuType="bubble" />
    </>
  );
};

export default Options;
