import React, { forwardRef } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import ToolTip from "components/Common/ToolTip";

const noop = () => {};
const BUTTON_STYLES = {
  primary: "primary",
  secondary: "secondary",
  danger: "danger",
  text: "text",
  link: "link",
};
const BUTTON_SIZES = { large: "large", default: "default" };
const ICON_POSITIONS = { left: "left", right: "right" };

const Button = forwardRef((props, ref) => {
  let {
    icon = null,
    iconPosition = "right",
    iconSize = 16,
    label = "",
    loading = false,
    onClick = noop,
    to = null,
    type = "button",
    style = "primary",
    fullWidth = false,
    className = "",
    disabled = false,
    size = null,
    href = null,
    tooltipProps = null,
    ...otherProps
  } = props;

  const handleClick = e => {
    if (!loading && !disabled) {
      onClick(e);
    }
  };

  let Parent, elementSpecificProps;
  if (to) {
    Parent = Link;
    elementSpecificProps = { to };
  } else if (href) {
    Parent = "a";
    elementSpecificProps = { href };
  } else {
    Parent = "button";
    elementSpecificProps = {
      type,
    };
  }

  let Icon =
    typeof icon == "string"
      ? () => <i className={classnames("ne-btn__icon", [icon])} />
      : icon || React.Fragment;

  const spinnerMarginSide =
    iconPosition == "left" ? "marginRight" : "marginLeft";

  return (
    <ToolTip {...tooltipProps} disabled={!tooltipProps}>
      <Parent
        ref={ref}
        onClick={handleClick}
        className={classnames("ne-btn", [className], {
          "ne-btn--style-primary": style === BUTTON_STYLES.primary,
          "ne-btn--style-secondary": style === BUTTON_STYLES.secondary,
          "ne-btn--style-danger": style === BUTTON_STYLES.danger,
          "ne-btn--style-text": style === BUTTON_STYLES.text,
          "ne-btn--style-link": style === BUTTON_STYLES.link,
          "ne-btn--size-large": size === BUTTON_SIZES.large,
          "ne-btn--width-full": fullWidth,
          "ne-btn--icon-left": iconPosition == ICON_POSITIONS.left,
          "ne-btn--icon-only": !label,
          disabled: disabled,
        })}
        disabled={disabled}
        {...elementSpecificProps}
        {...otherProps}
      >
        {label && <span>{label}</span>}
        {icon ? (
          <Icon key="2" size={iconSize} className="ne-btn__icon" />
        ) : null}
      </Parent>
    </ToolTip>
  );
});

Button.displayName = "Button";
export default Button;
