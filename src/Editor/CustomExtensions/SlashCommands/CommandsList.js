import React from "react";
import classnames from "classnames";

class CommandsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
  }

  componentDidUpdate(oldProps) {
    if (this.props.items !== oldProps.items) {
      this.setState({
        selectedIndex: 0,
      });
    }
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
      <div className="relative py-2 overflow-hidden bg-gray-900 rounded shadow">
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
        "flex items-center w-full px-4 py-2 space-x-4 transition-all duration-100 ease-in-out hover:bg-gray-700 cursor-pointer",
        {
          "bg-gray-600": index === selectedIndex,
        }
      )}
      onClick={() => selectItem(index)}
    >
      {Icon && (
        <div className="p-1 text-gray-100 bg-gray-800 rounded-sm">
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
