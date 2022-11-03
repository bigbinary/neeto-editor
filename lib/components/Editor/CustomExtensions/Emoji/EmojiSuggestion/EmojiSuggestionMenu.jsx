import React from "react";

import classnames from "classnames";
import { init, SearchIndex } from "emoji-mart";

import emojiPickerApi from "apis/emoji_picker";
import Loader from "components/Common/Loader";
import { isNilOrEmpty } from "utils/common";

class EmojiSuggestionMenu extends React.Component {
  state = {
    isLoading: false,
    selectedIndex: 0,
    emojiSuggestions: [],
  };

  componentDidMount() {
    init({
      data: this.fetchEmojiData,
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

  fetchEmojiData = async () => {
    this.setState({ isLoading: true });
    try {
      const { data } = await emojiPickerApi.fetch();
      this.setState({ isLoading: false });

      return data;
    } catch {
      this.setState({ isLoading: false });

      return {};
    }
  };

  searchEmoji = async () => {
    if (this.props.query) {
      return (await SearchIndex.search(this.props.query)).slice(0, 5);
    }

    const defaultEmojis = ["+1", "-1", "smile", "tada", "heart"];
    const results = await Promise.all(
      defaultEmojis.map(emoji => SearchIndex.search(emoji))
    );

    return results.map(result => result[0]);
  };

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
      .setEmoji(suggestions[0])
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
        {this.state.isLoading && <Loader />}
        {!this.state.isLoading &&
          (this.state.emojiSuggestions.length > 0 ? (
            this.state.emojiSuggestions.map((emoji, index) => (
              <div
                data-cy={`neeto-editor-emoji-suggestion-${emoji.id}`}
                key={emoji.id}
                className={classnames("neeto-editor-emoji-suggestion__item", {
                  "neeto-editor-emoji-suggestion__item--selected":
                    index === this.state.selectedIndex,
                })}
                onClick={() => this.selectItem(index)}
              >
                {emoji.skins[0].native}
              </div>
            ))
          ) : (
            <p>No results</p>
          ))}
      </div>
    );
  }
}

export default EmojiSuggestionMenu;
