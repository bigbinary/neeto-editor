import React, { useState } from "react";

import { Smiley } from "neetoicons";

import EmojiPicker from "components/Editor/CustomExtensions/Emoji/EmojiPicker/EmojiPickerMenu";

import Dropdown from "./UI/Dropdown";

const Emoji = ({ editor, tooltipContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      className="ne-headless__emoji"
      icon={Smiley}
      isOpen={isOpen}
      buttonProps={{
        tooltipProps: {
          content: tooltipContent,
          delay: [500],
          position: "bottom",
        },
      }}
      onClick={() => setIsOpen(open => !open)}
      onClose={() => setIsOpen(false)}
    >
      <EmojiPicker editor={editor} />
    </Dropdown>
  );
};

export default Emoji;
