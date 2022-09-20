import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import Item from "./Item";

const SIZES = { large: "large", small: "small" };

const Tab = ({
  size = SIZES.small,
  noUnderline = false,
  children,
  className = "",
  ...otherProps
}) => (
  <div
    className={classnames(
      {
        "ne-tab__wrapper": true,
      },
      {
        "ne-tab__wrapper--size-large": size === SIZES.large,
      },
      {
        "ne-tab__wrapper--size-small": size === SIZES.small,
      },
      {
        "ne-tab__wrapper--underline-none": noUnderline,
      },
      [className]
    )}
    data-cy="tab-container"
    {...otherProps}
  >
    {children}
  </div>
);

Tab.propTypes = {
  /**
   * To hide the underline
   */
  noUnderline: PropTypes.bool,
  /**
   * Set the size of the tabs.
   */
  size: PropTypes.oneOf(Object.values(SIZES)),
  /**
   * To add content inside Tab
   */
  children: PropTypes.node,
  /**
   * Extra classes can be provided to the Tab
   */
  className: PropTypes.string,
};

Tab.Item = Item;

export default Tab;
