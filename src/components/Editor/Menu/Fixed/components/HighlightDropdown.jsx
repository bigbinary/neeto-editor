import React, { useRef } from "react";

import classNames from "classnames";
import { Down } from "neetoicons";
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

const HighlightDropdown = ({
  editor,
  icon: Icon,
  label,
  tooltipContent,
  runEditorCommand,
}) => {
  const dropdownRef = useRef(null);
  const textColor = editor.getAttributes("textStyle").color;
  const backgroundColor = editor.getAttributes("textStyle").backgroundColor;

  const handleBackgroundColorClick = colorVar => {
    if (backgroundColor === `var(${colorVar})`) {
      runEditorCommand(editor =>
        editor
          .chain()
          .focus()
          .setMark("textStyle", { backgroundColor: null })
          .run()
      )();
    } else {
      runEditorCommand(editor =>
        editor
          .chain()
          .focus()
          .setMark("textStyle", { backgroundColor: `var(${colorVar})` })
          .run()
      )();
    }
  };

  const handleTextColorClick = colorVar => {
    if (textColor === `var(${colorVar})`) {
      editor.chain().focus().unsetColor().run();
    } else {
      editor.chain().focus().setColor(`var(${colorVar})`).run();
    }
  };

  const renderColorDots = (colorList, isTextColor = false) =>
    colorList.map((colorVar, idx) => (
      <ColorDot
        {...{ colorVar, isTextColor }}
        key={idx}
        isSelected={
          isTextColor
            ? textColor === `var(${colorVar})`
            : backgroundColor === `var(${colorVar})`
        }
        onClick={() =>
          isTextColor
            ? handleTextColorClick(colorVar)
            : handleBackgroundColorClick(colorVar)
        }
      />
    ));

  return (
    <Dropdown
      autoWidth
      placement="bottom-start"
      strategy="fixed"
      buttonProps={{
        icon: Icon,
        iconPosition: "left",
        iconSize: 20,
        label: <Down size={12} />,
        ref: dropdownRef,
        "data-cy": "neeto-editor-fixed-menu-highlight-option",
        onKeyDown: event =>
          event.key === "ArrowDown" && dropdownRef.current?.click(),
        tooltipProps: { content: tooltipContent ?? label, position: "bottom" },
        style: "text",
        size: "small",
        className: "neeto-editor-fixed-menu__item",
      }}
    >
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
