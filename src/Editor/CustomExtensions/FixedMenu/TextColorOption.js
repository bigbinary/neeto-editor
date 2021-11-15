import React, { useRef } from "react";

import { TextColor } from "../../../Common/Icons";
import { ICON_COLOR_ACTIVE, MENU_ICON_SIZE } from "./constants";

const TextColorOption = ({ color = "#000", onChange }) => {
  const colorInputRef = useRef();

  return (
    <div
      onClick={() => colorInputRef.current?.click()}
      className="flex items-center justify-center p-3 transition-colors cursor-pointer editor-fixed-menu--item"
    >
      <TextColor
        size={MENU_ICON_SIZE}
        underlineColor={color}
        color={ICON_COLOR_ACTIVE}
      />
      <input
        ref={colorInputRef}
        type="color"
        className="invisible w-0 h-0"
        onChange={(event) => onChange && onChange(event.target.value)}
      />
    </div>
  );
};

export default TextColorOption;
