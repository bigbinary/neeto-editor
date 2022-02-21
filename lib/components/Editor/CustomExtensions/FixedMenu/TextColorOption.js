import React, { useRef } from "react";
import { TextColor } from "components/Common/Icons";

import { ICON_COLOR_INACTIVE, MENU_ICON_SIZE } from "./constants";

const TextColorOption = ({ color = "#000", onChange }) => {
  const colorInputRef = useRef();

  return (
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
        data-cy="neeto-editor-fixed-menu-text-color-option-input"
      />
    </div>
  );
};

export default TextColorOption;
