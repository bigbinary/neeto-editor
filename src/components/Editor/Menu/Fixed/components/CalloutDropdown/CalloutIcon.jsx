import { Flag } from "neetoicons";

const CalloutIcon = ({ currentType }) => {
  if (currentType?.emoji) {
    return (
      <span className="neeto-editor-callout-dropdown__current-emoji">
        {currentType.emoji}
      </span>
    );
  }

  return <Flag size={16} />;
};

export default CalloutIcon;
