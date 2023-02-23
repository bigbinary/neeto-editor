import React, { useState } from "react";

import { NeetoChangelog } from "neetoicons";
import { Button, Dropdown, Input } from "neetoui";
import { useTranslation } from "react-i18next";

const { Menu } = Dropdown;

const TableOption = ({ editor, tooltipContent }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);

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
          placeholder={t("placeholders.rows")}
          size="small"
          type="number"
          value={rows}
          onChange={e => setRows(e.target.value)}
        />
        <Input
          data-cy="neeto-editor-fixed-menu-table-option-input"
          placeholder={t("placeholders.rows")}
          size="small"
          type="number"
          value={columns}
          onChange={e => setColumns(e.target.value)}
        />
        <Button
          data-cy="neeto-editor-fixed-menu-table-option-create-button"
          label="Create"
          size="small"
          onClick={handleSubmit}
        />
      </Menu>
    </Dropdown>
  );
};

export default TableOption;
