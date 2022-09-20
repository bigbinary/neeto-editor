import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

const noop = () => {};

const Item = ({
  active,
  className = "",
  children,
  icon = null,
  onClick = noop,
  ...otherProps
}) => {
  const Parent = "button";
  const Icon =
    typeof icon === "string"
      ? () => (
          <i
            className={icon}
            data-cy="ne-tab-item-icon"
            data-testid="ne-tab-icon"
          />
        )
      : icon || React.Fragment;

  return (
    <Parent
      className={classnames(
        ["ne-tab flex items-center justify-center select-none", className],
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

Item.displayName = "Tab.Item";

Item.propTypes = {
  /**
   * To set the Active Tab
   */
  active: PropTypes.bool,
  /**
   * Extra classes can be provided to the Tab Item
   */
  className: PropTypes.string,
  /**
   * To add content inside Tab Item
   */
  children: PropTypes.node,
  /**
   * To add icons to Tab Item
   */
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  /**
   * Callback to be triggered when user clicks on the Tab Item
   */
  onClick: PropTypes.func,
  activeClassName: PropTypes.string,
};

export default Item;
