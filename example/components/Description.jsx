import React from "react";

import classNames from "classnames";

const Description = ({ children, className }) => (
  <p className={classNames({ [className]: className })}>{children}</p>
);

export default Description;
