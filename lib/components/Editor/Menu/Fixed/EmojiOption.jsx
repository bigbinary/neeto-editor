import React from "react";

import { Smiley } from "neetoicons";
import { Dropdown } from "neetoui";

import EmojiPickerMenu from "../../CustomExtensions/Emoji/EmojiPicker/EmojiPickerMenu";

const EmojiOption = ({ editor }) => (
  <Dropdown
    buttonProps={{ tooltipProps: { content: "Emoji", position: "bottom" } }}
    buttonStyle="text"
    closeOnSelect={false}
    dropdownProps={{ classNames: "neeto-editor-fixed-menu__emoji-dropdown" }}
    icon={() => <Smiley size={18} />}
    position="bottom-start"
    strategy="fixed"
  >
    <EmojiPickerMenu editor={editor} />
  </Dropdown>
);

export default EmojiOption;
