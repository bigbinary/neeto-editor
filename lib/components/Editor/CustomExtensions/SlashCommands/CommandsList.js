import React from "react";
import classnames from "classnames";

import { scrollHandler } from "utils/scrollhandler";

class CommandsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };

    this.menuRef = React.createRef();
  }

  componentDidUpdate(oldProps) {
    if (this.props.items !== oldProps.items) {
      this.setState({
        selectedIndex: 0,
      });
    }

    scrollHandler({
      wrapperRef: this.menuRef,
      index: this.state.selectedIndex,
    });
  }

  onKeyDown = ({ event }) => {
    if (event.key === "ArrowUp") {
      this.upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      this.downHandler();
      return true;
    }

    if (event.key === "Enter") {
      this.enterHandler();
      return true;
    }

    return false;
  };

  upHandler = () => {
    this.setState({
      selectedIndex:
        (this.state.selectedIndex + this.props.items.length - 1) %
        this.props.items.length,
    });
  };

  downHandler = () => {
    this.setState({
      selectedIndex: (this.state.selectedIndex + 1) % this.props.items.length,
    });
  };

  enterHandler = () => {
    this.selectItem(this.state.selectedIndex);
  };

  selectItem = (index) => {
    const item = this.props.items[index];

    if (item) {
      const { editor, range } = this.props;
      item.command({ editor, range });
    }
  };

  render() {
    return (
      <div ref={this.menuRef} className="neeto-editor-slash-commands__wrapper">
        {this.props.items.map((item, index) => (
          <Item
            key={item.title}
            item={item}
            index={index}
            selectedIndex={this.state.selectedIndex}
            selectItem={() => this.selectItem(index)}
          />
        ))}
      </div>
    );
  }
}

const Item = ({ item, selectedIndex, index, selectItem }) => {
  const Icon = item.Icon;
  return (
    <div
      className={classnames("neeto-editor-slash-commands__item", {
        active: index === selectedIndex,
      })}
      onClick={() => selectItem(index)}
    >
      {Icon && <Icon size={20} />}
      <div className="neeto-editor-slash-commands__item-content">
        <h5>{item.title}</h5>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default CommandsList;
