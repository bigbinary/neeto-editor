import React from "react";
import classNames from "classnames";

import Avatar from "components/Common/Avatar";

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
      command({ label: item.label, id: item.key });
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

    const containerClassName =
      "relative p-2 space-y-1 overflow-hidden rounded shadow editor-command-list--root";
    const itemClassName =
      "flex items-center w-full px-4 py-2 transition-all duration-100 ease-in-out cursor-pointer text-xs text-white rounded editor-command-list--item";

    return (
      <div className={containerClassName}>
        {items.map(({ label, imageUrl, showImage }, index) => (
          <button
            className={classNames(itemClassName, {
              selected_item: index === selectedIndex,
            })}
            key={label}
            onClick={() => this.selectItem(index)}
          >
            {showImage ? (
              <Avatar user={{ name: label, imageUrl }} className="mr-2" />
            ) : null}
            <span>{label}</span>
          </button>
        ))}
      </div>
    );
  }
}
