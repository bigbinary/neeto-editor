import React, { useRef } from "react";
import { TextColor } from "components/Common/Icons";
import ToolTip from "components/Common/ToolTip";

import { ICON_COLOR_INACTIVE, MENU_ICON_SIZE } from "./constants";

const TextColorOption = ({ color = "#000", onChange }) => {
  const colorInputRef = useRef();

  return (
    <ToolTip content="Text Color" position="bottom">
      <div
        onClick={() => colorInputRef.current?.click()}
        className="neeto-editor-fixed-menu__item"
        data-cy="neeto-editor-fixed-menu-text-color-option"
      >
        <TextColor
          size={MENU_ICON_SIZE}
          color={ICON_COLOR_INACTIVE}
          underlineColor={color}
        />
        <input
          ref={colorInputRef}
          type="color"
          onChange={(event) => onChange && onChange(event.target.value)}
        />
      </div>
    </ToolTip>
  );
};

export default TextColorOption;
