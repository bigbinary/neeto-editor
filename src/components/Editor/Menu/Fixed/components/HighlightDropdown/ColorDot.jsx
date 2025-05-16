import classNames from "classnames";
import { Typography } from "neetoui";

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

export default ColorDot;
