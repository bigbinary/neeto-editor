import React from "react";
import { NimblePicker } from "emoji-mart";

import "emoji-mart/css/emoji-mart.css";
import data from "emoji-mart/data/apple.json";

const Picker = ({ editor }) => {
  const anchor = editor.view.state.selection.anchor;

  return (
    <NimblePicker
      data={data}
      theme="light"
      native
      set="apple"
      showPreview={false}
      showSkinTones={false}
      onSelect={(emoji) => {
        editor
          .chain()
          .focus()
          .deleteRange({ from: anchor - 2, to: anchor })
          .setEmoji(emoji)
          .run();
      }}
    />
  );
};

export default Picker;
