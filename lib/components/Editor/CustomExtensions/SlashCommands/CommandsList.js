import React from "react";
import classnames from "classnames";

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

    this.scrollHandler();
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

  scrollHandler = () => {
    if (!this.menuRef.current) {
      return;
    }

    const MARGIN_HEIGHT = 8;
    const parentItem = this.menuRef.current;
    const selectedItem = parentItem.children[this.state.selectedIndex];
    const itemHeight = selectedItem.clientHeight + MARGIN_HEIGHT;

    let scrollPosition = parentItem.scrollTop;
    if (
      selectedItem.offsetTop + itemHeight >
      scrollPosition + parentItem.clientHeight
    ) {
      scrollPosition =
        selectedItem.offsetTop - parentItem.clientHeight + itemHeight;
    } else if (scrollPosition > selectedItem.offsetTop) {
      scrollPosition = selectedItem.offsetTop - MARGIN_HEIGHT;
    }

    this.menuRef.current.scrollTop = scrollPosition;
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
