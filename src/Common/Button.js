import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

import Tooltip from "./Tooltip";

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

const Button = React.forwardRef((props, ref) => {
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

  const handleClick = (e) => {
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
      ? () => <i className={classnames("neeto-ui-btn__icon", [icon])} />
      : icon || React.Fragment;

  const spinnerMarginSide =
    iconPosition == "left" ? "marginRight" : "marginLeft";

  return (
    <Tooltip {...tooltipProps} disabled={!tooltipProps}>
      <Parent
        ref={ref}
        onClick={handleClick}
        className={classnames("neeto-ui-btn", [className], {
          "neeto-ui-btn--style-primary": style === BUTTON_STYLES.primary,
          "neeto-ui-btn--style-secondary": style === BUTTON_STYLES.secondary,
          "neeto-ui-btn--style-danger": style === BUTTON_STYLES.danger,
          "neeto-ui-btn--style-text": style === BUTTON_STYLES.text,
          "neeto-ui-btn--style-link": style === BUTTON_STYLES.link,
          "neeto-ui-btn--size-large": size === BUTTON_SIZES.large,
          "neeto-ui-btn--width-full": fullWidth,
          "neeto-ui-btn--icon-left": iconPosition == ICON_POSITIONS.left,
          "neeto-ui-btn--icon-only": !label,
          disabled: disabled,
        })}
        disabled={disabled}
        {...elementSpecificProps}
        {...otherProps}
      >
        {label && <span>{label}</span>}
        {icon ? (
          <Icon key="2" size={iconSize} className="neeto-ui-btn__icon" />
        ) : null}
      </Parent>
    </Tooltip>
  );
});

export default Button;
