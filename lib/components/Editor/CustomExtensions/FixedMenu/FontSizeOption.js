import React from "react";

import { TextSize } from "@bigbinary/neeto-icons";
import Dropdown from "common/Dropdown";

import { ICON_COLOR_ACTIVE, MENU_ICON_SIZE } from "./constants";

const FontSizeOption = ({ onChange }) => {
  const options = [
    { label: "H1", value: 1 },
    { label: "H2", value: 2 },
    { label: "H3", value: 3 },
    { label: "P", value: "p" },
  ];

  return (
    <Dropdown
      customTarget={() => (
        <button className="h-full p-3 transition-colors editor-fixed-menu--item">
          <TextSize size={MENU_ICON_SIZE} color={ICON_COLOR_ACTIVE} />
        </button>
      )}
      className="fontsize-dropdown"
    >
      {options.map(({ label, value }) => (
        <li onClick={() => onChange(value)} key={value} className="flex">
          <span className="text-lg">{label}</span>
        </li>
      ))}
    </Dropdown>
  );
};

export default FontSizeOption;
