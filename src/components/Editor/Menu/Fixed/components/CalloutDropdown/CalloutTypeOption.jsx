import classNames from "classnames";
import { Typography } from "neetoui";

const CalloutTypeOption = ({ calloutType, isSelected, onClick }) => {
  const optionClass = classNames("neeto-editor-callout-dropdown__type-option", {
    "neeto-editor-callout-dropdown__type-option--selected": isSelected,
  });

  return (
    <div {...{ onClick }} className={optionClass}>
      <span className="neeto-editor-callout-dropdown__type-emoji">
        {calloutType.emoji}
      </span>
      <Typography
        className="neeto-editor-callout-dropdown__type-label"
        style="body2"
        weight="medium"
      >
        {calloutType.label}
      </Typography>
    </div>
  );
};

export default CalloutTypeOption;
