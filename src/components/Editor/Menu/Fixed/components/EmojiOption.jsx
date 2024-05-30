import React from "react";

import { Smiley } from "neetoicons";
import { Dropdown } from "neetoui";

import SecondaryMenuTarget from "./SecondayMenuTarget";

import EmojiPickerMenu from "../../../CustomExtensions/Emoji/EmojiPicker/EmojiPickerMenu";

const EmojiOption = ({
  editor,
  isActive,
  setActive,
  tooltipContent,
  isSecondaryMenu = false,
  label,
}) => (
  <Dropdown
    buttonStyle="text"
    closeOnSelect={false}
    dropdownProps={{ classNames: "neeto-editor-fixed-menu__emoji-dropdown" }}
    icon={Smiley}
    isOpen={isActive}
    position={isSecondaryMenu ? "left-start" : "bottom-start"}
    strategy="fixed"
    buttonProps={{
      tabIndex: -1,
      tooltipProps: { content: tooltipContent ?? label, position: "bottom" },
      className: "neeto-editor-fixed-menu__item",
    }}
    customTarget={
      isSecondaryMenu && <SecondaryMenuTarget {...{ label }} icon={Smiley} />
    }
    onClose={() => setActive(false)}
    onClick={e => {
      setActive(active => !active);
      isSecondaryMenu && e.stopPropagation();
    }}
  >
    <EmojiPickerMenu {...{ editor, setActive }} />
  </Dropdown>
);

export default EmojiOption;
