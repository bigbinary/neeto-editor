import React from "react";
import { NimblePicker } from "emoji-mart";

import "emoji-mart/css/emoji-mart.css";
import data from "emoji-mart/data/apple.json";

const Picker = ({ editor }) => {
  return (
    <NimblePicker
      data={data}
      theme="light"
      native
      set="apple"
      showPreview={false}
      showSkinTones={false}
      onSelect={(emoji) => {
        editor.chain().focus().setEmoji(emoji).run();
      }}
    />
  );
};

export default Picker;
