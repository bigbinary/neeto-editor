import React, { useState } from "react";

import { useFuncDebounce } from "neetocommons/react-utils";
import { Customize } from "neetoicons";
import { Button, Dropdown, Input } from "neetoui";
import { not } from "ramda";
import { HexColorPicker } from "react-colorful";
import { useTranslation } from "react-i18next";

const TextColorOption = ({ editor, tooltipContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(editor.getAttributes("textStyle").color);

  const { t } = useTranslation();

  const handleColorChange = useFuncDebounce(color => {
    setColor(color);
    editor.commands.setColor(color);
    setIsOpen(false);
    editor.commands.focus();
  }, 300);

  const handleReset = () => {
    editor.commands.unsetColor();
    setIsOpen(false);
    editor.commands.focus();
  };

  return (
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
      <HexColorPicker color={color || "#000000"} onChange={handleColorChange} />
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
  );
};

export default TextColorOption;
