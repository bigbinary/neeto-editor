import React from "react";

import classnames from "classnames";
import { emojiIndex } from "emoji-mart";

class EmojiSuggestionMenu extends React.Component {
  state = {
    selectedIndex: 0,
    emojiSuggestions: emojiIndex.search("smile").slice(0, 5),
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
    if (event.key === "ArrowLeft") {
      this.leftHandler();
      return true;
    }

    if (event.key === "ArrowRight") {
      this.rightHandler();
      return true;
    }

    if (event.key === "Enter") {
      this.enterHandler();
      return true;
    }

    return false;
  };

  leftHandler = () => {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + this.state.emojiSuggestions.length - 1) %
        this.state.emojiSuggestions.length,
    });
  };

  rightHandler = () => {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + 1) % this.state.emojiSuggestions.length,
    });
  };

  enterHandler = () => {
    this.selectItem(this.state.selectedIndex);
  };

  selectItem = (index) => {
    this.props.editor
      .chain()
      .focus()
      .deleteRange(this.props.range)
      .setEmoji(this.state.emojiSuggestions[index])
      .run();
  };

  render() {
    return (
      <div className="flex space-x-0.5 items-center h-10">
        {this.state.emojiSuggestions.length > 0 ? (
          this.state.emojiSuggestions.map((emoji, index) => (
            <div
              key={emoji.id}
              onClick={() => this.selectItem(index)}
              className={classnames(
                "px-2 py-0.5 text-2xl transition-all duration-200 rounded cursor-pointer hover:bg-gray-100",
                { "bg-gray-200": index === this.state.selectedIndex }
              )}
            >
              {emoji.native}
            </div>
          ))
        ) : (
          <p className="p-2 font-semibold text-gray-500">No results</p>
        )}
      </div>
    );
  }
}

export default EmojiSuggestionMenu;
