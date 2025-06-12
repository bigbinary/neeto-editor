import { useState } from "react";

import { Button, Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import { CALLOUT_TYPES } from "./constants.js";

const CalloutOption = ({
  editor,
  isCalloutDropdownOpen,
  setIsCalloutDropdownOpen,
}) => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState("info");

  const handleInsertCallout = (type = selectedType) => {
    const calloutConfig = CALLOUT_TYPES[type];

    editor
      .chain()
      .focus()
      .setCallout({ type, emoji: calloutConfig.emoji })
      .run();

    setIsCalloutDropdownOpen(false);
  };

  const handleTypeSelect = type => {
    setSelectedType(type);
    handleInsertCallout(type);
  };

  return (
    <Dropdown
      isOpen={isCalloutDropdownOpen}
      position="bottom-start"
      trigger={
        <Button
          className="neeto-editor-callout-trigger"
          label={t("neetoEditor.menu.callout")}
          onClick={() => setIsCalloutDropdownOpen(!isCalloutDropdownOpen)}
        />
      }
      onClose={() => setIsCalloutDropdownOpen(false)}
    >
      <div className="callout-type-menu">
        <div className="callout-type-menu-header">
          {t("neetoEditor.menu.selectCalloutType")}
        </div>
        {Object.entries(CALLOUT_TYPES).map(([typeKey, typeConfig]) => (
          <Button
            className="callout-type-menu-option"
            key={typeKey}
            onClick={() => handleTypeSelect(typeKey)}
          >
            <span className="callout-type-emoji">{typeConfig.emoji}</span>
            <span className="callout-type-label">{typeConfig.label}</span>
          </Button>
        ))}
      </div>
    </Dropdown>
  );
};

export default CalloutOption;
