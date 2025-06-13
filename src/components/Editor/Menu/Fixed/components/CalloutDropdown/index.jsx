import React, { useRef } from "react";

import { Down } from "neetoicons";
import { Typography, Dropdown } from "neetoui";
import { useTranslation } from "react-i18next";

import CalloutIcon from "./CalloutIcon";
import CalloutTypeOption from "./CalloutTypeOption";
import { CALLOUT_TYPES } from "./constants";

const CalloutDropdown = ({ editor, label, tooltipContent }) => {
  const { t } = useTranslation();
  const dropdownRef = useRef(null);

  const isInCallout = editor.isActive("callout");
  const currentCalloutAttrs = isInCallout
    ? editor.getAttributes("callout")
    : null;

  const currentType =
    CALLOUT_TYPES.find(type => type.type === currentCalloutAttrs?.type) ||
    CALLOUT_TYPES[0];

  const handleCalloutTypeClick = calloutType => {
    if (isInCallout && currentCalloutAttrs?.type === calloutType.type) {
      editor.chain().focus().lift("callout").run();
    } else if (isInCallout) {
      editor
        .chain()
        .focus()
        .updateAttributes("callout", {
          type: calloutType.type,
          emoji: calloutType.emoji,
        })
        .run();
    } else {
      editor
        .chain()
        .focus()
        .setCallout({
          type: calloutType.type,
          emoji: calloutType.emoji,
        })
        .run();
    }
  };

  const renderCalloutOptions = () =>
    CALLOUT_TYPES.map((calloutType, idx) => (
      <CalloutTypeOption
        {...{ calloutType }}
        key={idx}
        isSelected={
          isInCallout && currentCalloutAttrs?.type === calloutType.type
        }
        onClick={() => handleCalloutTypeClick(calloutType)}
      />
    ));

  return (
    <Dropdown
      autoWidth
      placement="bottom-start"
      strategy="fixed"
      buttonProps={{
        icon: () => (
          <CalloutIcon currentType={isInCallout ? currentType : null} />
        ),
        iconPosition: "left",
        iconSize: 20,
        label: <Down size={12} />,
        ref: dropdownRef,
        "data-cy": "neeto-editor-fixed-menu-callout-option",
        onKeyDown: event =>
          event.key === "ArrowDown" && dropdownRef.current?.click(),
        tooltipProps: { content: tooltipContent ?? label, position: "bottom" },
        style: isInCallout ? "secondary" : "text",
        size: "small",
        className: "neeto-editor-fixed-menu__item",
      }}
    >
      <Dropdown.Menu className="neeto-editor-callout-dropdown">
        <div className="neeto-editor-callout-dropdown__section">
          <Typography
            className="neeto-editor-callout-dropdown__section-title"
            style="body2"
            weight="normal"
          >
            {t("neetoEditor.menu.selectCalloutType")}
          </Typography>
          <div className="neeto-editor-callout-dropdown__options-grid">
            {renderCalloutOptions()}
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CalloutDropdown;
