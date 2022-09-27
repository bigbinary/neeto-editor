import React from "react";

import classnames from "classnames";

import {
  BUTTON_ICON_POSITIONS,
  SIZES,
  BUTTON_STYLES,
  BUTTON_TYPES,
} from "./constants";
import Tooltip from "./ToolTip";

const Button = React.forwardRef(
  (
    {
      icon = null,
      iconPosition = BUTTON_ICON_POSITIONS.right,
      iconSize = 16,
      label = "",
      loading = false,
      onClick = () => {},
      type = BUTTON_TYPES.button,
      style = BUTTON_STYLES.primary,
      fullWidth = false,
      className = "",
      disabled = false,
      size = SIZES.medium,
      href = "",
      tooltipProps = null,
      ...otherProps
    },
    ref
  ) => {
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

    const handleClick = e => {
      if (!loading && !disabled) {
        onClick(e);
      }
    };

    const Icon =
      typeof icon === "string"
        ? () => <i className={classnames("ne-btn__icon", [icon])} />
        : icon || React.Fragment;

    return (
      <Tooltip disabled={!tooltipProps} {...tooltipProps}>
        <Parent
          ref={ref}
          onClick={handleClick}
          className={classnames("ne-btn", [className], {
            "ne-btn--style-primary": style === BUTTON_STYLES.primary,
            "ne-btn--style-secondary": style === BUTTON_STYLES.secondary,
            "ne-btn--style-danger": style === BUTTON_STYLES.danger,
            "ne-btn--style-danger-text": style === BUTTON_STYLES.danger_text,
            "ne-btn--style-text": style === BUTTON_STYLES.text,
            "ne-btn--style-link": style === BUTTON_STYLES.link,
            "ne-btn--size-medium": size === SIZES.medium,
            "ne-btn--size-large": size === SIZES.large,
            "ne-btn--width-full": fullWidth,
            "ne-btn--icon-left": iconPosition === BUTTON_ICON_POSITIONS.left,
            "ne-btn--icon-only": !label,
            disabled: disabled,
          })}
          disabled={disabled}
          {...elementSpecificProps}
          {...otherProps}
        >
          {label && <span>{label}</span>}

          {icon && <Icon key="2" size={iconSize} className="ne-btn__icon" />}
        </Parent>
      </Tooltip>
    );
  }
);

Button.displayName = "Button";
export default Button;
