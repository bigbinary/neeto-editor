import React from "react";

import { TextSize } from "@bigbinary/neeto-icons";
import Dropdown from "components/Common/Dropdown";

import {
  ICON_COLOR_ACTIVE,
  ICON_COLOR_INACTIVE,
  MENU_ICON_SIZE,
} from "./constants";

const FontSizeOption = ({ editor }) => {
  const options = [
    { label: "H1", value: 1 },
    { label: "H2", value: 2 },
    { label: "H3", value: 3 },
    { label: "H4", value: 4 },
  ];

  const isActive = (level) => editor.isActive("heading", { level });
  const onClick = (level) =>
    editor.chain().focus().toggleHeading({ level }).run();

  return (
    <Dropdown
      customTarget={() => (
        <button
          type="button"
          className="h-full p-3 transition-colors editor-fixed-menu--item"
        >
          <TextSize size={MENU_ICON_SIZE} color={ICON_COLOR_ACTIVE} />
        </button>
      )}
      className="fontsize-dropdown"
      placement="bottom"
    >
      <div className="flex px-1">
        {options.map(({ label, value }) => (
          <li onClick={() => onClick(value)} key={value} className="flex">
            <span
              className="text-lg"
              style={{
                color: isActive(value)
                  ? ICON_COLOR_ACTIVE
                  : ICON_COLOR_INACTIVE,
              }}
            >
              {label}
            </span>
          </li>
        ))}
      </div>
    </Dropdown>
  );
};

export default FontSizeOption;
