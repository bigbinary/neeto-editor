import React from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

const noop = () => {};

const TAB_SIZES = { large: "large", default: "default" };

const Tab = ({
  children,
  size,
  noUnderline,
  className = "",
  ...otherProps
}) => {
  return (
    <div
      className={classnames(
        {
          "ne-tab__wrapper": true,
        },
        {
          "ne-tab__wrapper--size-large": size === TAB_SIZES.large,
        },
        {
          "ne-tab__wrapper--underline-none": noUnderline,
        },
        [className]
      )}
      data-cy="tab-container"
      {...otherProps}
    >
      {children}
    </div>
  );
};

const Item = ({
  active,
  className = "",
  children,
  icon = null,
  onClick = noop,
  activeClassName = "",
  ...otherProps
}) => {
  let Parent = "button";
  let Icon =
    typeof icon == "string"
      ? () => <i className={icon} data-cy="tab-item-icon" />
      : icon || React.Fragment;

  if (activeClassName) {
    Parent = NavLink;
  }
  return (
    <Parent
      className={classnames(
        [
          "ne-tab flex items-center justify-center select-none",
          className,
        ],
        {
          active: active,
        }
      )}
      onClick={onClick}
      data-cy="tab-item"
      {...otherProps}
    >
      {icon && <Icon className="ne-tab__icon" />}
      {children}
    </Parent>
  );
};

Tab.Item = Item;

export default Tab;
