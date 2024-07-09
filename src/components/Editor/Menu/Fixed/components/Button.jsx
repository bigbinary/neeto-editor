import React, { memo } from "react";

import { Button } from "neetoui";

import useEditorStore from "src/stores/useEditorStore";
import { generateFocusProps } from "utils/focusHighlighter";

const MenuButton = ({
  icon,
  command,
  optionName,
  highlight,
  disabled: isButtonDisabled = false,
  label,
}) => {
  const { isActive, disabled = isButtonDisabled } = useEditorStore.pick([
    "marksState",
    optionName,
  ]);

  return (
    <Button
      {...{ disabled, icon }}
      className="neeto-editor-fixed-menu__item"
      data-cy={`neeto-editor-fixed-menu-${optionName}-option`}
      style={isActive ? "secondary" : "text"}
      tabIndex="-1"
      tooltipProps={{ content: label, position: "bottom" }}
      onClick={command}
      {...generateFocusProps(highlight)}
    />
  );
};

export default memo(MenuButton);
