import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import { generateFocusProps } from "utils/focusProps";

import {
  ICON_COLOR_ACTIVE,
  ICON_COLOR_INACTIVE,
  MENU_ICON_SIZE,
} from "./constants";
import ToolTip from "./ToolTip";

const MenuButton = ({
  icon: Icon,
  iconActive = true,
  tooltipProps,
  highlight = false,
  color,
  ...otherProps
}) => (
  <ToolTip {...tooltipProps}>
    <button
      className={classnames("neeto-editor-fixed-menu__item", {
        active: iconActive,
      })}
      type="button"
      {...generateFocusProps(highlight)}
      {...otherProps}
    >
      <Icon
        color={color || (iconActive ? ICON_COLOR_ACTIVE : ICON_COLOR_INACTIVE)}
        size={MENU_ICON_SIZE}
      />
    </button>
  </ToolTip>
);

MenuButton.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  iconActive: PropTypes.bool,
  onClick: PropTypes.func,
  tooltipProps: PropTypes.object,
};

export default MenuButton;
