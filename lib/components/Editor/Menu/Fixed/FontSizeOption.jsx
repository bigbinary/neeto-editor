import React from "react";

import classnames from "classnames";
import { Down } from "neetoicons";

import Dropdown from "components/Common/Dropdown";
import MenuButton from "components/Common/MenuButton";

import { FONT_SIZE_OPTIONS } from "./constants";

const FontSizeOption = ({ editor }) => {
  const isActive = level => editor.isActive("heading", { level });
  const label =
    FONT_SIZE_OPTIONS.find(({ value }) => isActive(value))?.label ||
    "Paragraph";

  const handleClick = level =>
    level
      ? editor.chain().focus().toggleHeading({ level }).run()
      : editor.chain().focus().setNode("paragraph").run();

  const { Menu, MenuItem } = Dropdown;

  return (
    <Dropdown
      className="neeto-editor-font-size-wrapper"
      dropdownProps={{ classNames: "ne-dropdown__popup--auto-width" }}
      placement="bottom-start"
      customTarget={() => (
        <MenuButton
          data-cy="neeto-editor-fixed-menu-font-size-option"
          icon={Down}
          iconActive={false}
          label={label}
          tooltipProps={{
            content: "Font Size",
            position: "bottom",
            delay: [500],
          }}
        />
      )}
    >
      <Menu>
        {FONT_SIZE_OPTIONS.map(({ label, value }) => (
          <MenuItem.Button
            className={classnames({ active: isActive(value) })}
            data-cy={`neeto-editor-fixed-menu-font-size-option-${label}`}
            key={value}
            onClick={() => handleClick(value)}
          >
            {label}
          </MenuItem.Button>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default FontSizeOption;
