import React from "react";

import { Smiley } from "neetoicons";
import { Dropdown } from "neetoui";

import EmojiPickerMenu from "../../CustomExtensions/Emoji/EmojiPicker/EmojiPickerMenu";

const EmojiOption = ({ editor, isActive, setActive, tooltipContent }) => (
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
      tooltipProps: { content: tooltipContent, position: "bottom" },
      className: "neeto-editor-fixed-menu__item",
    }}
    onClick={() => setActive(active => !active)}
    onClose={() => setActive(false)}
  >
    <EmojiPickerMenu editor={editor} setActive={setActive} />
  </Dropdown>
);

export default EmojiOption;
