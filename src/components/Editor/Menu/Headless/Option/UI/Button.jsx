import React from "react";

import classnames from "classnames";
import { Tooltip } from "neetoui";

import { noop } from "neetocommons/pure";

const Button = ({
  icon = null,
  onClick = noop,
  disabled = false,
  className,
  tooltipProps,
  ...otherProps
}) => {
  const Icon = icon;

  return (
    <Tooltip
      disabled={!tooltipProps}
      onClick={() => onClick()}
      {...tooltipProps}
    >
      <button
        className={classnames("ne-headless-btn", { [className]: className })}
        disabled={disabled}
        type="button"
        onClick={onClick}
        {...otherProps}
      >
        {icon && <Icon aria-hidden="true" key="2" size={18} />}
      </button>
    </Tooltip>
  );
};

export default Button;
