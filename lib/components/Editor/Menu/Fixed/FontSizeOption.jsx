import React from "react";

import { Dropdown } from "neetoui";

import { FONT_SIZE_OPTIONS } from "./constants";

const { Menu, MenuItem } = Dropdown;

const FontSizeOption = ({ editor, tooltips }) => {
  const isActive = level => editor.isActive("heading", { level });
  const label =
    FONT_SIZE_OPTIONS.find(({ value }) => isActive(value))?.label ||
    "Paragraph";

  const handleClick = level =>
    level
      ? editor.chain().focus().toggleHeading({ level }).run()
      : editor.chain().focus().setNode("paragraph").run();

  return (
    <Dropdown
      autoWidth
      buttonStyle="text"
      data-cy="neeto-editor-fixed-menu-font-size-option"
      label={label}
      placement="bottom-start"
      buttonProps={{
        tooltipProps: {
          content: tooltips?.fontSize || "Font size",
          position: "bottom",
        },
        className:
          "neeto-editor-fixed-menu__item neeto-editor-font-size__wrapper",
      }}
    >
      <Menu>
        {FONT_SIZE_OPTIONS.map(({ label, value }) => (
          <MenuItem.Button
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
