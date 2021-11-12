import React from "react";
import classNames from "classnames";

import Avatar from "../../../Common/Avatar";

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
      "relative p-2 overflow-hidden bg-gray-900 rounded shadow";
    const itemClassName =
      "flex items-center w-full px-4 py-2 transition-all duration-100 ease-in-out hover:bg-gray-700 cursor-pointer text-xs text-white rounded";

    return (
      <div className={containerClassName}>
        {items.map(({ label, imageUrl, showImage }, index) => (
          <button
            className={classNames(itemClassName, {
              "bg-gray-700": index === selectedIndex,
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
