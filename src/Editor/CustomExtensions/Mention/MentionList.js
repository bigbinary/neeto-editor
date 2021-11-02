import React from "react";

import { getItemKey, getItemLabel } from "./helpers";

export class MentionList extends React.Component {
  state = { selectedIndex: 0 };

  componentDidUpdate(prevProps) {
    const { items } = this.props;
    if (items !== prevProps.items) {
      this.setState({ selectedIndex: 0 });
    }
  }

  selectItem = (index) => {
    const { items, command } = this.props;
    const item = items[index];

    if (item) {
      command({ label: getItemLabel(item), id: getItemKey(item) });
    }
  };

  upHandler = () => {
    const { items } = this.props;
    this.setState((prevState) => {
      const { selectedIndex } = prevState;
      const nextSelectedIndex =
        (selectedIndex + items.length - 1) % items.length;
      return {
        selectedIndex: nextSelectedIndex,
      };
    });
  };

  downHandler = () => {
    const { items } = this.props;
    this.setState((prevState) => {
      const { selectedIndex } = prevState;
      const nextSelectedIndex = (selectedIndex + 1) % items.length;
      return {
        selectedIndex: nextSelectedIndex,
      };
    });
  };

  enterHandler = () => {
    const { selectedIndex } = this.state;
    this.selectItem(selectedIndex);
  };

  onKeyDown = ({ event }) => {
    const keyDownHandlers = {
      ArrowUp: this.upHandler,
      ArrowDown: this.downHandler,
      Enter: this.enterHandler,
    };

    if (keyDownHandlers.hasOwnProperty(event.key)) {
      keyDownHandlers[event.key]();
      return true;
    }

    return false;
  };

  render() {
    const { selectedIndex } = this.state;
    const { items } = this.props;

    return (
      <div className="items">
        {items.map((item, index) => (
          <button
            className={`item ${index === selectedIndex ? "is-selected" : ""}`}
            key={index}
            onClick={() => this.selectItem(index)}
          >
            {getItemLabel(item)}
          </button>
        ))}
      </div>
    );
  }
}
