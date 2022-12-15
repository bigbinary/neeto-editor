import React, { useEffect, useState } from "react";

import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";

const Tooltip = ({
  content,
  children,
  theme = "dark",
  disabled = false,
  placement, // Remove this prop once this prop is migrated to position in all neeto products
  position = "auto",
  interactive = false,
  hideAfter = -1,
  hideOnTargetExit = false,
  ...otherProps
}) => {
  const [instance, setInstance] = useState(null);
  const localProps = {};

  if (hideAfter > 0) {
    localProps["onShow"] = instance =>
      setTimeout(() => instance.hide(), hideAfter);
  }

  useEffect(() => {
    if (hideOnTargetExit) {
      const intersectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => !entry.isIntersecting && instance?.hide());
      });
      instance?.reference && intersectionObserver.observe(instance?.reference);

      return () => intersectionObserver.disconnect();
    }
  }, [instance, hideOnTargetExit]);

  return (
    <Tippy
      animation="scale-subtle"
      arrow="<svg width='12' height='6' viewBox='0 0 10 5' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M10 5H0.926697L3.95208 1.63847C4.74227 0.760478 6.11722 0.754951 6.91445 1.62656L10 5Z' /></svg>"
      content={content}
      disabled={disabled}
      duration={[100, 200]}
      interactive={interactive}
      placement={placement || position}
      plugins={[followCursor]}
      role="tooltip"
      theme={theme}
      zIndex={100001}
      onCreate={instance => setInstance(instance)}
      {...localProps}
      {...otherProps}
    >
      {children}
    </Tippy>
  );
};

export default Tooltip;
