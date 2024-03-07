import React from "react";

import classnames from "classnames";
import { noop } from "neetocist";
import { Tooltip } from "neetoui";

const Button = ({
  icon = null,
  onClick = noop,
  disabled = false,
  optionName = "",
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
        data-test-id={optionName.replace(/\s+/g, "-")}
        type="button"
        {...{ disabled, onClick, ...otherProps }}
      >
        {icon && <Icon aria-hidden="true" key="2" size={18} />}
      </button>
    </Tooltip>
  );
};

export default Button;
