import React, { useEffect, useRef, useState } from "react";

import { useFuncDebounce, useOnClickOutside } from "neetocommons/react-utils";
import { Customize } from "neetoicons";
import { Button, Dropdown, Input } from "neetoui";
import { not } from "ramda";
import { HexColorPicker } from "react-colorful";
import { useTranslation } from "react-i18next";

const TextColorOption = ({ editor, tooltipContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(editor.getAttributes("textStyle").color);

  const dropdownWrapperRef = useRef(null);
  const { t } = useTranslation();

  const handleDebouncedClose = useFuncDebounce(
    color => editor.commands.setColor(color),
    300
  );

  const handleReset = () => {
    editor.commands.unsetColor();
    setIsOpen(false);
    editor.commands.focus();
  };

  const handleColorChange = color => {
    setColor(color);
    handleDebouncedClose(color);
  };

  useOnClickOutside(dropdownWrapperRef, event => {
    if (isOpen) {
      event.preventDefault();
      editor.commands.focus();
      setIsOpen(false);
    }
  });

  useEffect(() => {
    editor.commands.setBackgroundColor("#ACCEF7");

    if (!isOpen) {
      editor.commands.unsetBackgroundColor();
      editor.commands.removeEmptyTextStyle();
      editor.commands.focus();
    }
  }, [isOpen]);

  return (
    <div ref={dropdownWrapperRef}>
      <Dropdown
        buttonStyle={isOpen ? "secondary" : "text"}
        icon={Customize}
        isOpen={isOpen}
        buttonProps={{
          tooltipProps: { content: tooltipContent, position: "bottom" },
          className:
            "neeto-editor-fixed-menu__item neeto-editor-text-color-option",
        }}
        onClick={() => {
          setColor(editor.getAttributes("textStyle").color);
          setIsOpen(not);
        }}
      >
        <HexColorPicker
          color={color || "#000000"}
          onChange={handleColorChange}
        />
        <div className="neeto-editor-text-color-option__options-group">
          <Input
            autoFocus
            className="neeto-editor-text-color-option__options-group__input"
            placeholder={t("placeholders.pickColor")}
            size="small"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
          <Button
            className="neeto-editor-text-color-option__options-group__reset-button"
            label={t("common.reset")}
            size="small"
            style="text"
            onClick={handleReset}
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default TextColorOption;
