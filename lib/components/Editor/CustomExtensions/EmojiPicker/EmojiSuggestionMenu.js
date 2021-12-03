import React from "react";

import { emojiIndex } from "emoji-mart";

const EmojiSuggestionMenu = (props) => {
  const { range, query } = JSON.parse(localStorage.getItem("props"));
  const emojiSuggestions = emojiIndex.search(query || "smile");

  const handleInsertEmoji = (emoji) => {
    localStorage.setItem("emoji", emoji.native);
    props.editor.chain().focus().deleteRange(range).setEmoji(emoji).run();
  };

  return (
    <div className="flex space-x-0.5 items-center h-10">
      {emojiSuggestions.length > 0 ? (
        emojiSuggestions.slice(0, 5).map((emoji) => (
          <div
            key={emoji.id}
            onClick={() => handleInsertEmoji(emoji)}
            className="px-2 py-0.5 text-2xl transition-all duration-200 rounded cursor-pointer hover:bg-gray-100"
          >
            {emoji.native}
          </div>
        ))
      ) : (
        <p className="p-2 font-semibold text-gray-500">No results</p>
      )}
    </div>
  );
};

export default EmojiSuggestionMenu;
