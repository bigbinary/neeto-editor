import React from "react";

import classnames from "classnames";
import { emojiIndex } from "emoji-mart";
import { isNilOrEmpty } from "utils/common";

class EmojiSuggestionMenu extends React.Component {
  state = {
    selectedIndex: 0,
    emojiSuggestions: emojiIndex
      .search(this.props.query || "smile")
      .slice(0, 5),
  };

  componentDidUpdate(oldProps) {
    if (this.props.query !== oldProps.query) {
      this.setState({
        emojiSuggestions: emojiIndex
          .search(this.props.query || "smile")
          .slice(0, 5),
      });
    }
  }

  onKeyDown = ({ event }) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      this.setState({
        selectedIndex:
          (this.state.selectedIndex + this.state.emojiSuggestions.length - 1) %
          this.state.emojiSuggestions.length,
      });

      return true;
    }

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      this.setState({
        selectedIndex:
          (this.state.selectedIndex + 1) % this.state.emojiSuggestions.length,
      });

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
        this.props.editor
          .chain()
          .focus()
          .deleteRange(this.props.range)
          .setEmoji(emojiIndex.search(this.props.query)?.[0])
          .run();
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
              {emoji.native}
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
