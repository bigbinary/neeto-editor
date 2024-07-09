import React, { memo } from "react";

import { Button } from "neetoui";

import { generateFocusProps } from "utils/focusHighlighter";

const MenuButton = ({
  icon,
  command,
  optionName,
  highlight,
  disabled,
  label,
  editor,
}) => (
  <Button
    {...{ disabled, icon }}
    className="neeto-editor-fixed-menu__item"
    data-cy={`neeto-editor-fixed-menu-${optionName}-option`}
    style={editor.isActive(optionName) ? "secondary" : "text"}
    tabIndex="-1"
    tooltipProps={{ content: label, position: "bottom" }}
    onClick={command}
    {...generateFocusProps(highlight)}
  />
);

export default memo(MenuButton);
