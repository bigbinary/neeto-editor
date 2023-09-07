import React, { useState } from "react";

import { withEventTargetValue } from "neetocommons/utils";
import { NeetoChangelog } from "neetoicons";
import { Button, Dropdown, Input } from "neetoui";
import { useTranslation } from "react-i18next";

import { TABLE_HTML } from "./constants";

const { Menu } = Dropdown;

const TableOption = ({ editor, tooltipContent }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);

  const triggerDosAndDonts = () => {
    editor.isActive("table") && editor.commands.deleteTable();
    editor
      .chain()
      .focus()
      .insertContent(TABLE_HTML, {
        parseOptions: {
          preserveWhitespace: false,
        },
      })
      .run(),
      handleClose();
  };

  const handleClose = () => {
    setRows(3);
    setColumns(3);
    setIsOpen(false);
  };

  const handleSubmit = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows, cols: columns, withHeaderRow: true })
      .run(),
      handleClose();
  };

  return (
    <Dropdown
      buttonStyle={isOpen ? "secondary" : "text"}
      closeOnSelect={false}
      data-cy="neeto-editor-fixed-menu-link-option"
      icon={NeetoChangelog}
      isOpen={isOpen}
      position="bottom"
      buttonProps={{
        tabIndex: -1,
        tooltipProps: { content: tooltipContent, position: "bottom" },
        className: "neeto-editor-fixed-menu__item",
      }}
      onClick={() => setIsOpen(isOpen => !isOpen)}
      onClose={handleClose}
    >
      <Menu className="neeto-editor-table__item">
        <Input
          autoFocus
          data-cy="neeto-editor-fixed-menu-table-option-input"
          min="1"
          placeholder={t("placeholders.rows")}
          size="small"
          type="number"
          value={rows}
          onChange={withEventTargetValue(setRows)}
        />
        <Input
          data-cy="neeto-editor-fixed-menu-table-option-input"
          min="1"
          placeholder={t("placeholders.rows")}
          size="small"
          type="number"
          value={columns}
          onChange={withEventTargetValue(setColumns)}
        />
        <Button
          data-cy="neeto-editor-fixed-menu-table-option-create-button"
          label={t("common.create")}
          size="small"
          onClick={handleSubmit}
        />
      </Menu>
      <Menu className="neeto-editor-table__item">
        <Button
          label={t("table.triggerDosAndDonts")}
          size="small"
          style="secondary"
          onClick={triggerDosAndDonts}
        />
      </Menu>
    </Dropdown>
  );
};

export default TableOption;
