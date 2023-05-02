import React, { useEffect, useState } from "react";

import { Customize } from "neetoicons";
import { Button, Dropdown, Input } from "neetoui";
import { HexColorPicker } from "react-colorful";
import { useTranslation } from "react-i18next";

const TextColorOption = ({ editor, tooltipContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState(editor.getAttributes("textStyle").color);

  const { t } = useTranslation();

  const handleSubmit = () => {
    editor.commands.setColor(color);
    setIsOpen(false);
    editor.commands.focus();
  };

  const handleReset = () => {
    editor.commands.unsetColor();
    setIsOpen(false);
    editor.commands.focus();
  };

  useEffect(() => {
    setColor(editor.getAttributes("textStyle").color);
  }, [isOpen, editor]);

  return (
    <Dropdown
      buttonStyle={isOpen ? "secondary" : "text"}
      closeOnOutsideClick={false}
      icon={Customize}
      isOpen={isOpen}
      buttonProps={{
        tooltipProps: { content: tooltipContent, position: "bottom" },
        className:
          "neeto-editor-fixed-menu__item neeto-editor-text-color-option",
      }}
      onClick={() => setIsOpen(isOpen => !isOpen)}
    >
      <HexColorPicker color={color || "#000000"} onChange={setColor} />
      <Input
        autoFocus
        className="neeto-editor-text-color-option__input"
        label={t("common.hex")}
        placeholder={t("placeholders.pickColor")}
        value={color}
        onChange={e => setColor(e.target.value)}
      />
      <div className="neeto-editor-text-color-option__button-group">
        <Button label={t("common.done")} size="small" onClick={handleSubmit} />
        <Button
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
