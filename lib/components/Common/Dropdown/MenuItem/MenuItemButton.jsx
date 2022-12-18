import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import MenuItem from "./MenuItem";

const MenuItemButton = ({
  children,
  className,
  isActive,
  style,
  prefix,
  suffix,
  type = "button",
  href = "",
  ...otherProps
}) => {
  let Parent, elementSpecificProps;
  if (href) {
    Parent = "a";
    elementSpecificProps = { href };
  } else {
    Parent = "button";
    elementSpecificProps = {
      type,
    };
  }

  return (
    <MenuItem>
      <Parent
        className={classnames("ne-dropdown__popup-menu-item-btn", className, {
          "ne-dropdown__popup-menu-item-btn": isActive,
          "ne-dropdown__popup-menu-item-btn--style-danger": style === "danger",
        })}
        {...otherProps}
        {...elementSpecificProps}
      >
        {prefix && (
          <div className="ne-dropdown__popup-menu-item-btn__prefix">
            {prefix}
          </div>
        )}
        {children}
        {suffix && (
          <div className="ne-dropdown__popup-menu-item-btn__suffix">
            {suffix}
          </div>
        )}
      </Parent>
    </MenuItem>
  );
};

MenuItemButton.propTypes = {
  /**
   * To specify className to be applied to the Menu Item.
   */
  className: PropTypes.string,
  /**
   * To specify the content to be rendered inside the Menu Item.
   */
  children: PropTypes.node,
  /**
   * To specify the active state of the Menu Item.
   */
  isActive: PropTypes.bool,
  /**
   * To specify an internal route to which the Button points to.
   */
  to: PropTypes.string,
  /**
   * To specify an external link to which the Button points to.
   */
  href: PropTypes.string,
  /**
   * To specify the content to be added at the end of the input field.
   */
  suffix: PropTypes.node,
  /**
   * To specify the content to be added at the beginning of the input field.
   */
  prefix: PropTypes.node,
  /**
   * To specify the type of Button.
   */
};

export default MenuItemButton;
