import React from "react";
import { GoTextSize } from "react-icons/go";

import Dropdown from "../../../Common/Dropdown";

const FontSizeOption = ({ onChange }) => {
  const options = [
    { label: <h2 className="text-xl font-medium">Large</h2>, value: "large" },
    { label: <h3 className="text-lg">Medium</h3>, value: "medium" },
    { label: <span className="text-sm">Normal</span>, value: "normal" },
  ];

  return (
    <Dropdown
      Icon={() => <GoTextSize className="text-gray-400" />}
      options={options}
      className="p-3 cursor-pointer hover:bg-gray-800"
      onChange={onChange}
    />
  );
};

export default FontSizeOption;
