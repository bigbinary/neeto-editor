import { memo, useRef } from "react";

import { filterBy } from "neetocist";
import { Dropdown, Typography } from "neetoui";
import { last } from "ramda";

import useEditorStore from "src/stores/useEditorStore";

import { FONT_SIZE_OPTIONS } from "../../constants";

const { Menu, MenuItem } = Dropdown;

const FontSizeOption = ({
  runEditorCommand,
  tooltipContent,
  label,
  options = [],
}) => {
  const dropdownRef = useRef(null);

  const lastOption = last(FONT_SIZE_OPTIONS);
  const { fontSizeOption: activeOption = lastOption } =
    useEditorStore.pick("marksState");

  const handleClick = level =>
    level
      ? runEditorCommand(editor =>
          editor.chain().focus().toggleHeading({ level }).run()
        )()
      : runEditorCommand(editor =>
          editor.chain().focus().setNode("paragraph").run()
        )();

  const menuOptions = [
    ...filterBy({ key: key => options.includes(key) }, FONT_SIZE_OPTIONS),
    FONT_SIZE_OPTIONS.at(-1),
  ];

  return (
    <Dropdown
      autoWidth
      label={activeOption?.label}
      placement="bottom-start"
      strategy="fixed"
      buttonProps={{
        ref: dropdownRef,
        "data-cy": "neeto-editor-fixed-menu-font-size-option",
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
        {menuOptions.map(({ label, value, key }) => (
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
