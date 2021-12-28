import React from "react";
import classNames from "classnames";

const Portal = ({ children, className, ...otherProps }) => {
  return (
    <div
      className={classNames("ne-backdrop", {
        [className]: className,
      })}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default Portal;
