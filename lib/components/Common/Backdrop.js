import React from "react";
import classNames from "classnames";

const Portal = ({ children, className, ...otherProps }) => {
  return (
    <div
      className={classNames("transition-opacity bg-gray-500 bg-opacity-50", {
        [className]: className,
      })}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default Portal;
