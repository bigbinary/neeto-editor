import React, { memo, useRef } from "react";

import { Dropdown, Typography } from "neetoui";

import useEditorStore from "src/stores/useEditorStore";

import { FONT_SIZE_OPTIONS } from "../constants";

const { Menu, MenuItem } = Dropdown;

const FontSizeOption = ({ runEditorCommand, tooltipContent, label }) => {
  const dropdownRef = useRef(null);

  const { heading: activeOption } = useEditorStore.pick("marksState");

  const handleClick = level =>
    level
      ? runEditorCommand(editor =>
          editor.chain().focus().toggleHeading({ level }).run()
        )()
      : runEditorCommand(editor =>
          editor.chain().focus().setNode("paragraph").run()
        )();

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
        tooltipProps: { content: tooltipContent ?? label, position: "bottom" },
        style: "text",
        size: "small",
        className:
          "neeto-editor-fixed-menu__item neeto-editor-font-size__wrapper",
      }}
    >
      <Menu>
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

export default memo(FontSizeOption);
