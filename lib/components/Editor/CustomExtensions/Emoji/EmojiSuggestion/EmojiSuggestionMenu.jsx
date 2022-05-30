import React from "react";

import classnames from "classnames";
import { init, SearchIndex } from "emoji-mart";
import { isNilOrEmpty } from "utils/common";

const data = async () => {
  const response = await fetch("https://cdn.jsdelivr.net/npm/@emoji-mart/data");

  return response.json();
};

class EmojiSuggestionMenu extends React.Component {
  state = {
    selectedIndex: 0,
    emojiSuggestions: [],
  };

  componentDidMount() {
    init({
      data,
      theme: "light",
      previewPosition: "none",
    });
    this.searchEmojiAndSetState();
  }

  componentDidUpdate(oldProps) {
    if (this.props.query !== oldProps.query) {
      this.searchEmojiAndSetState();
    }
  }

  searchEmoji = async () =>
    (await SearchIndex.search(this.props.query || "smile")).slice(0, 5);

  searchEmojiAndSetState = async () => {
    const suggestions = await this.searchEmoji();
    this.setState({
      emojiSuggestions: suggestions,
    });
  };

  setEditorState = async () => {
    const suggestions = await this.searchEmoji();
    this.props.editor
      .chain()
      .focus()
      .deleteRange(this.props.range)
      .setEmoji(SearchIndex.search(suggestions[0]))
      .run();
  };

  onKeyDown = ({ event }) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      this.setState(({ selectedIndex, emojiSuggestions }) => ({
        selectedIndex:
          (selectedIndex + emojiSuggestions.length - 1) %
          emojiSuggestions.length,
      }));

      return true;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      this.setState(({ selectedIndex, emojiSuggestions }) => ({
        selectedIndex: (selectedIndex + 1) % emojiSuggestions.length,
      }));

      return true;
    }

    if (event.key === "Enter") {
      this.selectItem(this.state.selectedIndex);
      return true;
    }

    if (event.key === " ") {
      if (isNilOrEmpty(this.props.query)) {
        this.props.editor.chain().focus().insertContent(" ").run();
      } else {
        this.setEditorState();
      }

      return true;
    }

    if (event.key === "Escape") {
      this.props.editor.chain().focus().insertContent(" ").run();

      return true;
    }

    return false;
  };

  selectItem = index => {
    this.props.editor
      .chain()
      .focus()
      .deleteRange(this.props.range)
      .setEmoji(this.state.emojiSuggestions[index])
      .run();
  };

  render() {
    return (
      <div className="neeto-editor-emoji-suggestion">
        {this.state.emojiSuggestions.length > 0 ? (
          this.state.emojiSuggestions.map((emoji, index) => (
            <div
              key={emoji.id}
              onClick={() => this.selectItem(index)}
              className={classnames("neeto-editor-emoji-suggestion__item", {
                "neeto-editor-emoji-suggestion__item--selected":
                  index === this.state.selectedIndex,
              })}
              data-cy={`neeto-editor-emoji-suggestion-${emoji.id}`}
            >
              {emoji.skins[0].native}
            </div>
          ))
        ) : (
          <p>No results</p>
        )}
      </div>
    );
  }
}

export default EmojiSuggestionMenu;
