import React, { useEffect, useRef, useState } from "react";

import { useOnClickOutside } from "neetocommons/react-utils";
import { withEventTargetValue } from "neetocommons/utils";
import { Check, Close, Customize, Refresh } from "neetoicons";
import { Button, Dropdown, Input } from "neetoui";
import { not } from "ramda";
import { HexColorPicker } from "react-colorful";
import { useTranslation } from "react-i18next";

const TextColorOption = ({ editor, tooltipContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(null);

  const dropdownWrapperRef = useRef(null);
  const { t } = useTranslation();

  const handleSave = () => {
    editor.chain().focus().setColor(color).run();
    setIsOpen(false);
  };

  const handleUnset = () => {
    editor.chain().focus().unsetColor().run();
    setColor(null);
    setIsOpen(false);
  };

  useOnClickOutside(dropdownWrapperRef, event => {
    if (isOpen) {
      event.preventDefault();
      editor.commands.focus();
      setIsOpen(false);
    }
  });

  useEffect(() => {
    setColor(editor.getAttributes("textStyle").color);
  }, [isOpen, editor.getAttributes("textStyle").color]);

  return (
    <div ref={dropdownWrapperRef}>
      <Dropdown
        buttonStyle={isOpen || color ? "secondary" : "text"}
        icon={Customize}
        {...{ isOpen }}
        buttonProps={{
          tabIndex: -1,
          tooltipProps: { content: tooltipContent, position: "bottom" },
          className:
            "neeto-editor-fixed-menu__item neeto-editor-text-color-option",
        }}
        onClick={() => {
          setColor(editor.getAttributes("textStyle").color);
          setIsOpen(not);
        }}
      >
        <HexColorPicker color={color || "#000000"} onChange={setColor} />
        <div className="neeto-editor-text-color-option__options-group">
          <Input
            autoFocus
            className="neeto-editor-text-color-option__options-group__input"
            placeholder={t("neetoEditor.placeholders.pickColor")}
            size="small"
            value={color}
            onChange={withEventTargetValue(setColor)}
            onClick={event => event.stopPropagation()}
          />
          <Button icon={Check} size="small" onClick={handleSave} />
          <Button
            icon={Close}
            size="small"
            style="text"
            onClick={() => {
              editor.commands.focus();
              setIsOpen(false);
            }}
          />
          <Button
            icon={Refresh}
            size="small"
            style="text"
            tooltipProps={{
              content: t("neetoEditor.common.resetToDefault"),
              position: "top",
            }}
            onClick={handleUnset}
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default TextColorOption;
