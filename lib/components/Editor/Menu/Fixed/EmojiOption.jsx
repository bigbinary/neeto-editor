import React from "react";

import { Smiley } from "neetoicons";
import { Dropdown } from "neetoui";

import EmojiPickerMenu from "../../CustomExtensions/Emoji/EmojiPicker/EmojiPickerMenu";

const EmojiOption = ({ editor }) => (
  <Dropdown
    buttonStyle="text"
    closeOnSelect={false}
    dropdownProps={{ classNames: "neeto-editor-fixed-menu__emoji-dropdown" }}
    icon={Smiley}
    position="bottom-start"
    strategy="fixed"
    buttonProps={{
      tooltipProps: { content: "Emoji", position: "bottom" },
      className: "neeto-editor-fixed-menu__item",
    }}
  >
    <EmojiPickerMenu editor={editor} />
  </Dropdown>
);

export default EmojiOption;
