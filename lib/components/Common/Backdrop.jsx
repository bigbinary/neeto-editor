import React, { forwardRef } from "react";

const Portal = ({ children, ...otherProps }, ref) => (
  <div ref={ref} data-testid="ne-backdrop" {...otherProps}>
    {children}
  </div>
);

export default forwardRef(Portal);
