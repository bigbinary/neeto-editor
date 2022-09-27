import React, { useRef } from "react";

import Dropdown from "components/Common/Dropdown";
import MenuButton from "components/Common/MenuButton";
import { Smiley } from "neetoicons";

import EmojiPickerMenu from "../Emoji/EmojiPicker/EmojiPickerMenu";

const EmojiOption = ({ editor }) => {
  const dropdownRef = useRef();
  const { Menu } = Dropdown;

  return (
    <Dropdown
      ref={dropdownRef}
      closeOnSelect={false}
      customTarget={() => (
        <MenuButton
          icon={Smiley}
          iconActive={dropdownRef?.current?._tippy?.state?.isVisible}
          tooltipProps={{ content: "Emoji", position: "bottom", delay: [500] }}
          data-cy="neeto-editor-fixed-menu-emoji-option-button"
        />
      )}
      position="bottom-start"
    >
      <Menu>
        <EmojiPickerMenu editor={editor} />
      </Menu>
    </Dropdown>
  );
};

export default EmojiOption;
