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
          "neeto-ui-tab__wrapper flex": true,
        },
        {
          "neeto-ui-tab__wrapper--size-large": size === TAB_SIZES.large,
        },
        {
          "neeto-ui-tab__wrapper--underline-none": noUnderline,
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
          "neeto-ui-tab flex items-center justify-center select-none",
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
      {icon && <Icon className="neeto-ui-tab__icon" />}
      {children}
    </Parent>
  );
};

Tab.Item = Item;

export default Tab;
