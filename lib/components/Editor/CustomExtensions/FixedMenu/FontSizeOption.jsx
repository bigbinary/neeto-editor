import { EDITOR_OPTIONS } from "constants/common";

import React from "react";

import classnames from "classnames";
import Dropdown from "components/Common/Dropdown";
import MenuButton from "components/Common/MenuButton";
import { TextSize } from "neetoicons";

const FontSizeOption = ({ editor, options }) => {
  const fontSizeOptions = {
    [EDITOR_OPTIONS.H1]: { label: "H1", value: 1 },
    [EDITOR_OPTIONS.H2]: { label: "H2", value: 2 },
    [EDITOR_OPTIONS.H3]: { label: "H3", value: 3 },
    [EDITOR_OPTIONS.H4]: { label: "H4", value: 4 },
    [EDITOR_OPTIONS.H5]: { label: "H5", value: 5 },
    [EDITOR_OPTIONS.H6]: { label: "H6", value: 6 },
  };

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
      {options.map(option => {
        const { label, value } = fontSizeOptions[option];
        return (
          <li
            onClick={() => onClick(value)}
            key={value}
            className={classnames({ active: isActive(value) })}
            data-cy={`neeto-editor-fixed-menu-font-size-option-${label}`}
          >
            {label}
          </li>
        );
      })}
    </Dropdown>
  );
};

export default FontSizeOption;
