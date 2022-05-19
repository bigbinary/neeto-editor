import React from "react";

import classNames from "classnames";

const Heading = ({ children, type = "main" }) => {
  const className = classNames({
    "mb-3 mt-14 text-3xl font-extrabold": type === "main",
    "mb-1 mt-8 text-xl font-bold": type === "sub",
  });

  return <h1 className={className}>{children}</h1>;
};

export default Heading;
