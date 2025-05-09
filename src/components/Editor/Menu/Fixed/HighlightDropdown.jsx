import React, { useState } from "react";

import classNames from "classnames";
import { Typography, Dropdown } from "neetoui";

const colors = {
  recent: ["--neeto-editor-highlight-bg-yellow-light"],
  text: [
    "--neeto-editor-highlight-text-1",
    "--neeto-editor-highlight-text-2",
    "--neeto-editor-highlight-text-3",
    "--neeto-editor-highlight-text-4",
    "--neeto-editor-highlight-text-5",
    "--neeto-editor-highlight-text-6",
    "--neeto-editor-highlight-text-7",
    "--neeto-editor-highlight-text-8",
    "--neeto-editor-highlight-text-9",
    "--neeto-editor-highlight-text-10",
  ],
  background: [
    "--neeto-editor-highlight-bg-1",
    "--neeto-editor-highlight-bg-2",
    "--neeto-editor-highlight-bg-3",
    "--neeto-editor-highlight-bg-4",
    "--neeto-editor-highlight-bg-5",
    "--neeto-editor-highlight-bg-6",
    "--neeto-editor-highlight-bg-7",
    "--neeto-editor-highlight-bg-8",
    "--neeto-editor-highlight-bg-9",
    "--neeto-editor-highlight-bg-10",
  ],
};

const ColorDot = ({ colorVar, isSelected, onClick, isTextColor }) => {
  const dotClass = classNames("neeto-editor-highlight-dropdown__color-dot", {
    "neeto-editor-highlight-dropdown__color-dot--selected": isSelected,
    "neeto-editor-highlight-dropdown__color-dot--background": !isTextColor,
  });

  const dotStyle = {
    ...(isTextColor
      ? { color: `var(${colorVar})` }
      : { backgroundColor: `var(${colorVar})` }),
  };

  return (
    <div {...{ onClick }} className={dotClass} style={dotStyle}>
      {isTextColor && (
        <Typography
          className="neeto-editor-highlight-dropdown__color-dot-text"
          style="body2"
          weight="semibold"
        >
          A
        </Typography>
      )}
    </div>
  );
};

const HighlightDropdown = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const renderColorDots = (colorList, isTextColor = false) =>
    colorList.map((colorVar, idx) => (
      <ColorDot
        {...{ colorVar, isTextColor }}
        isSelected={selectedColor === colorVar}
        key={idx}
        onClick={() => setSelectedColor(colorVar)}
      />
    ));

  return (
    <Dropdown>
      <Dropdown.Menu className="neeto-editor-highlight-dropdown">
        <div className="neeto-editor-highlight-dropdown__section">
          <Typography
            className="neeto-editor-highlight-dropdown__section-title"
            style="body2"
            weight="normal"
          >
            Text color
          </Typography>
          <div className="neeto-editor-highlight-dropdown__color-grid">
            {renderColorDots(colors.text, true)}
          </div>
        </div>
        <div className="neeto-editor-highlight-dropdown__section">
          <Typography
            className="neeto-editor-highlight-dropdown__section-title"
            style="body2"
            weight="normal"
          >
            Background color
          </Typography>
          <div className="neeto-editor-highlight-dropdown__color-grid">
            {renderColorDots(colors.background)}
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default HighlightDropdown;
