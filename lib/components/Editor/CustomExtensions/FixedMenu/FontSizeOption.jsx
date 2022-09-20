import { FONT_SIZE_OPTIONS } from "constants/common";

import React from "react";

import classnames from "classnames";
import Dropdown from "components/Common/Dropdown";
import MenuButton from "components/Common/MenuButton";
import { TextSize } from "neetoicons";

const FontSizeOption = ({ editor }) => {
  const isActive = level => editor.isActive("heading", { level });

  const onClick = level =>
    editor.chain().focus().toggleHeading({ level }).run();

  return (
    <Dropdown
      customTarget={() => (
        <MenuButton
          icon={TextSize}
          iconActive={editor.isActive("heading")}
          tooltipProps={{
            content: "Font Size",
            position: "bottom",
            delay: [500],
          }}
          data-cy="neeto-editor-fixed-menu-font-size-option"
        />
      )}
      className="neeto-editor-font-size-wrapper"
      placement="bottom"
    >
      {FONT_SIZE_OPTIONS.map(({ label, value }) => (
        <li
          onClick={() => onClick(value)}
          key={value}
          className={classnames({ active: isActive(value) })}
          data-cy={`neeto-editor-fixed-menu-font-size-option-${label}`}
        >
          {label}
        </li>
      ))}
    </Dropdown>
  );
};

export default FontSizeOption;
