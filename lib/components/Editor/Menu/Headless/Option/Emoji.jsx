import React from "react";

import { Smiley } from "neetoicons";

import EmojiPicker from "components/Editor/CustomExtensions/Emoji/EmojiPicker/EmojiPickerMenu";

import Dropdown from "./UI/Dropdown";

const Emoji = ({ editor, isActive, setActive, tooltipContent }) => (
  <Dropdown
    className="ne-headless__emoji"
    icon={Smiley}
    isOpen={isActive}
    buttonProps={{
      tooltipProps: {
        content: tooltipContent,
        delay: [500],
        position: "bottom",
      },
    }}
    onClick={() => setActive(active => !active)}
    onClose={() => setActive(false)}
  >
    <EmojiPicker editor={editor} setActive={setActive} />
  </Dropdown>
);
export default Emoji;
