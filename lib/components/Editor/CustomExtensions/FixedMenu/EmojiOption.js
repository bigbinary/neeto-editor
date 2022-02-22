import React, { useRef } from "react";
import { Smiley } from "@bigbinary/neeto-icons";
import Dropdown from "components/Common/Dropdown";
import MenuButton from "components/Common/MenuButton";

import EmojiPickerMenu from "../Emoji/EmojiPicker/EmojiPickerMenu";

const EmojiOption = ({ editor }) => {
  const dropdownRef = useRef();

  return (
    <Dropdown
      ref={dropdownRef}
      closeOnSelect={false}
      customTarget={() => (
        <MenuButton
          icon={Smiley}
          iconActive={dropdownRef?.current?.visible}
          tooltipProps={{ content: "Emoji", position: "bottom" }}
          data-cy="neeto-editor-fixed-menu-emoji-option-button"
        />
      )}
      position="bottom-start"
    >
      <EmojiPickerMenu editor={editor} />
    </Dropdown>
  );
};

export default EmojiOption;
