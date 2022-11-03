import React, { useRef } from "react";

import { Smiley } from "neetoicons";

import Dropdown from "components/Common/Dropdown";
import MenuButton from "components/Common/MenuButton";

import EmojiPickerMenu from "../Emoji/EmojiPicker/EmojiPickerMenu";

const EmojiOption = ({ editor }) => {
  const dropdownRef = useRef();
  const { Menu } = Dropdown;

  return (
    <Dropdown
      closeOnSelect={false}
      dropdownProps={{ classNames: "neeto-editor-fixed-menu__emoji-dropdown" }}
      position="bottom-start"
      ref={dropdownRef}
      customTarget={() => (
        <MenuButton
          data-cy="neeto-editor-fixed-menu-emoji-option-button"
          icon={Smiley}
          iconActive={dropdownRef?.current?._tippy?.state?.isVisible}
          tooltipProps={{ content: "Emoji", position: "bottom", delay: [500] }}
        />
      )}
    >
      <Menu>
        <EmojiPickerMenu editor={editor} />
      </Menu>
    </Dropdown>
  );
};

export default EmojiOption;
