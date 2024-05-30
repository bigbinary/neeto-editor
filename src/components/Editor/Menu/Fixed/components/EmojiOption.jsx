import React from "react";

import { Smiley } from "neetoicons";
import { Dropdown } from "neetoui";

import EmojiPickerMenu from "../../../CustomExtensions/Emoji/EmojiPicker/EmojiPickerMenu";

const { MenuItem } = Dropdown;

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
    position="bottom-start"
    strategy="fixed"
    buttonProps={{
      tabIndex: -1,
      tooltipProps: { content: tooltipContent ?? label, position: "bottom" },
      className: "neeto-editor-fixed-menu__item",
    }}
    customTarget={
      isSecondaryMenu && (
        <MenuItem.Button>
          <Smiley /> {label}
        </MenuItem.Button>
      )
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
