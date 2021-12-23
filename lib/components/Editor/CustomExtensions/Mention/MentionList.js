import React from "react";
import classNames from "classnames";

import Avatar from "components/Common/Avatar";
import { scrollHandler } from "utils/scrollhandler";

export class MentionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedIndex: 0 };
    this.mentionRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { items } = this.props;
    if (items !== prevProps.items) {
      this.setState({ selectedIndex: 0 });
    }

    scrollHandler({
      wrapperRef: this.mentionRef,
      index: this.state.selectedIndex,
    });
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

    if (items.length === 0) {
      return (
        <div className="neeto-editor-mentions__wrapper">
          <p className="neeto-editor-mentions__item">No Results</p>
        </div>
      );
    }

    return (
      <div ref={this.mentionRef} className="neeto-editor-mentions__wrapper">
        {items.map(({ label, imageUrl, showImage }, index) => (
          <button
            className={classNames("neeto-editor-mentions__item", {
              active: index === selectedIndex,
            })}
            key={label}
            onClick={() => this.selectItem(index)}
          >
            {showImage && <Avatar user={{ name: label, imageUrl }} />}
            <p>{label}</p>
          </button>
        ))}
      </div>
    );
  }
}
