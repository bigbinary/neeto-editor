import React from "react";

import { Button } from "neetoui";

import { generateFocusProps } from "utils/focusHighlighter";

const MenuButton = ({
  icon,
  command,
  active,
  optionName,
  highlight,
  disabled,
  label,
}) => (
  <Button
    {...{ disabled, icon }}
    className="neeto-editor-fixed-menu__item"
    data-cy={`neeto-editor-fixed-menu-${optionName}-option`}
    style={active ? "secondary" : "text"}
    tabIndex="-1"
    tooltipProps={{ content: label, position: "bottom" }}
    onClick={command}
    {...generateFocusProps(highlight)}
  />
);

export default MenuButton;
