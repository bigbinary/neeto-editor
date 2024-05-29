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
  tooltip,
}) => (
  <Button
    {...{ disabled, icon }}
    className="neeto-editor-fixed-menu__item"
    data-cy={`neeto-editor-fixed-menu-${optionName}-option`}
    key={optionName}
    style={active ? "secondary" : "text"}
    tabIndex="-1"
    tooltipProps={{ content: tooltip, position: "bottom" }}
    onClick={command}
    {...generateFocusProps(highlight)}
  />
);

export default MenuButton;
