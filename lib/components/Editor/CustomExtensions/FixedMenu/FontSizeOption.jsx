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

  const { Menu, MenuItem } = Dropdown;

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
      dropdownProps={{ classNames: "ne-dropdown__popup--auto-width" }}
      placement="bottom-start"
    >
      <Menu>
        {FONT_SIZE_OPTIONS.map(({ label, value }) => (
          <MenuItem.Button
            onClick={() => onClick(value)}
            key={value}
            className={classnames({ active: isActive(value) })}
            data-cy={`neeto-editor-fixed-menu-font-size-option-${label}`}
          >
            {label}
          </MenuItem.Button>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default FontSizeOption;
