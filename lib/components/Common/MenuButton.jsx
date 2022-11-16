import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import { generateFocusProps } from "utils/focusHighlighter";

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
  disabled,
  label,
  ...otherProps
}) => (
  <ToolTip {...tooltipProps}>
    <button
      disabled={disabled}
      type="button"
      className={classnames("neeto-editor-menu__item", {
        active: iconActive,
      })}
      {...generateFocusProps(highlight)}
      {...otherProps}
    >
      {label && <p>{label}</p>}
      {Icon && (
        <Icon
          size={MENU_ICON_SIZE}
          color={
            color || (iconActive ? ICON_COLOR_ACTIVE : ICON_COLOR_INACTIVE)
          }
        />
      )}
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
