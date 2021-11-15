import React from "react";

import { ICON_COLOR_ACTIVE, MENU_ICON_SIZE } from "./constants";
import Dropdown from "../../../Common/Dropdown";
import { TextSize } from "../../../Common/Icons";

const FontSizeOption = ({ onChange }) => {
  const options = [
    { label: <h2 className="text-xl font-medium">Large</h2>, value: "large" },
    { label: <h3 className="text-lg">Medium</h3>, value: "medium" },
    { label: <span className="text-sm">Normal</span>, value: "normal" },
  ];

  return (
    <Dropdown
      Icon={() => <TextSize size={MENU_ICON_SIZE} color={ICON_COLOR_ACTIVE} />}
      options={options}
      className="p-3 cursor-pointer editor-fixed-menu--item"
      onChange={onChange}
    />
  );
};

export default FontSizeOption;
