import React, { useRef } from "react";
import { Smiley } from "@bigbinary/neeto-icons";
import Dropdown from "components/Common/Dropdown";

import {
  ICON_COLOR_ACTIVE,
  ICON_COLOR_INACTIVE,
  MENU_ICON_SIZE,
} from "./constants";
import EmojiPickerMenu from "../Emoji/EmojiPicker/EmojiPickerMenu";

const EmojiOption = ({ editor }) => {
  const dropdownRef = useRef();

  return (
    <Dropdown
      ref={dropdownRef}
      closeOnSelect={false}
      customTarget={() => (
        <button className="neeto-editor-fixed-menu__item">
          <Smiley
            size={MENU_ICON_SIZE}
            color={
              dropdownRef?.current?.visible
                ? ICON_COLOR_ACTIVE
                : ICON_COLOR_INACTIVE
            }
          />
        </button>
      )}
      position="bottom-start"
    >
      <EmojiPickerMenu editor={editor} />
    </Dropdown>
  );
};

export default EmojiOption;
