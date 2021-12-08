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
      <div
        ref={this.menuRef}
        className="relative p-3 -mr-1 space-y-2 overflow-x-hidden overflow-y-scroll rounded shadow max-h-80 w-80 editor-command-list--root"
      >
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
      className={classnames(
        "flex items-center w-full px-4 py-2 space-x-4 transition-all duration-100 ease-in-out editor-command-list--item cursor-pointer rounded",
        {
          selected_item: index === selectedIndex,
        }
      )}
      onClick={() => selectItem(index)}
    >
      {Icon && (
        <div className="p-1 text-gray-100 rounded-sm">
          <Icon size={18} />
        </div>
      )}
      <div className="flex flex-col text-gray-100">
        <span className="text-sm font-semibold">{item.title}</span>
        <span className="text-xs text-gray-300">{item.description}</span>
      </div>
    </div>
  );
};

export default CommandsList;
