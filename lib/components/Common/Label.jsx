import React from "react";

import classnames from "classnames";
import { Info } from "neetoicons";
import PropTypes from "prop-types";

import Tooltip from "./ToolTip";

const Label = ({
  children,
  className = "",
  required = false,
  helpIconProps = null,
  ...otherProps
}) => {
  const {
    onClick,
    icon,
    tooltipProps,
    className: helpIconClassName,
    ...otherHelpIconProps
  } = helpIconProps || {};
  const HelpIcon = icon || Info;

  return (
    <label
      className={classnames("ne-label flex items-center", className)}
      {...otherProps}
    >
      {children}
      {required && <span aria-hidden>*</span>}
      {helpIconProps && (
        <Tooltip {...tooltipProps} disabled={!tooltipProps}>
          <span
            className={classnames("ne-label__help-icon-wrap", {
              [helpIconClassName]: helpIconClassName,
            })}
            onClick={onClick}
          >
            <HelpIcon size={16} {...otherHelpIconProps} />
          </span>
        </Tooltip>
      )}
    </label>
  );
};

Label.propTypes = {
  /**
   * To specify the content to be rendered inside the label.
   */
  children: PropTypes.node,
  /**
   * Provide external classnames to label component.
   */
  className: PropTypes.string,
  /**
   * To specify whether to show the required asterisk.
   */
  required: PropTypes.bool,
  /**
   * Props for the help icon
   */
  helpIconProps: PropTypes.shape({
    onClick: PropTypes.func,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    tooltipProps: PropTypes.shape({
      ...Tooltip.propTypes,
    }),
  }),
};

export default Label;
