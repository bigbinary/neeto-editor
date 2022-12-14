import React, { useRef } from "react";

import { TextColor } from "components/Common/Icons";
import MenuButton from "components/Common/MenuButton";

const TextColorOption = ({ color = "#000", onChange }) => {
  const colorInputRef = useRef();

  return (
    <MenuButton
      data-cy="neeto-editor-fixed-menu-text-color-option"
      iconActive={false}
      tooltipProps={{ content: "Text Color", position: "bottom", delay: [500] }}
      icon={({ color: iconColor, size }) => (
        <>
          <TextColor color={iconColor} size={size} underlineColor={color} />
          <input
            ref={colorInputRef}
            type="color"
            onChange={event => onChange && onChange(event.target.value)}
          />
        </>
      )}
      onClick={() => colorInputRef.current?.click()}
    />
  );
};

export default TextColorOption;
