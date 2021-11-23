import React from "react";

import { TextSize } from "@bigbinary/neeto-icons";

import { ICON_COLOR_ACTIVE, MENU_ICON_SIZE } from "./constants";
import Dropdown from "common/Dropdown";

const FontSizeOption = ({ onChange }) => {
  const options = [
    { label: <h2 className="text-xl font-medium">Large</h2>, value: "large" },
    { label: <h3 className="text-lg">Medium</h3>, value: "medium" },
    { label: <span className="text-sm">Normal</span>, value: "normal" },
  ];

  return (
    <Dropdown
      customTarget={() => (
        <button className="h-full p-3 transition-colors editor-fixed-menu--item">
          <TextSize size={MENU_ICON_SIZE} color={ICON_COLOR_ACTIVE} />
        </button>
      )}
    >
      {options.map(({ label, className, value }) => (
        <li className={className} onClick={() => onChange(value)} key={value}>
          {label}
        </li>
      ))}
    </Dropdown>
  );
};

export default FontSizeOption;
