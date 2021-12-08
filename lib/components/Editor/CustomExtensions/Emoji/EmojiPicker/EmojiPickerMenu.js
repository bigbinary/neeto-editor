import React from "react";

import { NimblePicker } from "emoji-mart";

import "emoji-mart/css/emoji-mart.css";
import data from "emoji-mart/data/apple.json";

class EmojiPickerMenu extends React.Component {
  onKeyDown = ({ event }) => {
    if (event.key === "Escape") {
      this.props.editor.chain().focus().deleteRange(this.props.range).run();
      return true;
    }

    return false;
  };

  handleSelect = (emoji) => {
    this.props.editor
      .chain()
      .focus()
      .deleteRange(this.props.range)
      .setEmoji(emoji)
      .run();
  };

  render() {
    return (
      <NimblePicker
        style={{ maxWidth: "100%" }}
        data={data}
        theme="light"
        native
        set="apple"
        showPreview={false}
        showSkinTones={false}
        onSelect={this.handleSelect}
      />
    );
  }
}

export default EmojiPickerMenu;
