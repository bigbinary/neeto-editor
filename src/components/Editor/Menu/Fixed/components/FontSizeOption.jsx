import React, { useRef } from "react";

import { Dropdown, Typography } from "neetoui";
import { last } from "ramda";

import { FONT_SIZE_OPTIONS } from "../constants";

const { Menu, MenuItem } = Dropdown;

const FontSizeOption = ({ editor, tooltipContent }) => {
  const dropdownRef = useRef(null);

  const isActive = level => editor.isActive("heading", { level });
  const activeOption =
    FONT_SIZE_OPTIONS.find(({ value }) => isActive(value)) ||
    last(FONT_SIZE_OPTIONS);

  const handleClick = level =>
    level
      ? editor.chain().focus().toggleHeading({ level }).run()
      : editor.chain().focus().setNode("paragraph").run();

  return (
    <Dropdown
      autoWidth
      data-cy="neeto-editor-fixed-menu-font-size-option"
      label={activeOption?.label}
      placement="bottom-start"
      strategy="fixed"
      buttonProps={{
        ref: dropdownRef,
        onKeyDown: event =>
          event.key === "ArrowDown" && dropdownRef.current?.click(),
        tooltipProps: { content: tooltipContent, position: "bottom" },
        style: "text",
        size: "small",
        className:
          "neeto-editor-fixed-menu__item neeto-editor-font-size__wrapper",
      }}
    >
      <Menu
        onKeyDown={event => event.key === "Escape" && editor.commands?.focus()}
      >
        {FONT_SIZE_OPTIONS.map(({ label, value, key }) => (
          <MenuItem.Button
            data-cy={`neeto-editor-fixed-menu-font-size-option-${key}`}
            key={value}
            onClick={() => handleClick(value)}
          >
            <Typography style={key}>{label}</Typography>
          </MenuItem.Button>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default FontSizeOption;
