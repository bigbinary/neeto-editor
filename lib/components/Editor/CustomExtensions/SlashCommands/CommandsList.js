import React, { forwardRef } from "react";
import classnames from "classnames";
import Tippy from "@tippyjs/react";
import isEmpty from "lodash.isempty";

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
    const { items } = this.props;
    const item = items[index];

    if (item && isEmpty(item.items)) {
      const { editor, range } = this.props;
      item.command({ editor, range });
    }
  };

  render() {
    const { items } = this.props;
    return (
      <div ref={this.menuRef} className="neeto-editor-slash-commands__wrapper">
        {items.map((item, index) => {
          const isLeafNode = isEmpty(item.items);

          const nodeElement = (
            <Item
              key={item.title}
              item={item}
              index={index}
              selectedIndex={this.state.selectedIndex}
              selectItem={() => this.selectItem(index)}
            />
          );

          if (isLeafNode) return nodeElement;

          return (
            <Tippy
              key={item.title}
              interactive
              placement="right"
              hideOnClick={false}
              content={<CommandsList {...this.props} items={item.items} />}
              onCreate={({ popper }) => (popper.style.width = "max-content")}
            >
              {nodeElement}
            </Tippy>
          );
        })}
      </div>
    );
  }
}

// eslint-disable-next-line react/display-name
const Item = forwardRef(({ item, selectedIndex, index, selectItem }, ref) => {
  const { Icon } = item;

  return (
    <div
      className={classnames("neeto-editor-slash-commands__item", {
        active: index === selectedIndex,
      })}
      onClick={() => selectItem(index)}
      ref={ref}
    >
      {Icon && <Icon size={20} />}
      <div className="neeto-editor-slash-commands__item-content">
        <h5>{item.title}</h5>
        <p>{item.description}</p>
      </div>
    </div>
  );
});

export default CommandsList;
