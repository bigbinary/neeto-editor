import React, { useState } from "react";

import { Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";

import { TABLE_ACTIONS } from "../Fixed/constants";

const TableOption = ({ editor, handleClose }) => {
  const { t } = useTranslation();

  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);

  const isActive = editor.isActive("table");

  const handleSubmit = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows, cols: columns, withHeaderRow: true })
      .run(),
      setRows(3);
    setColumns(3);
    handleClose();
  };

  return (
    <div className="neeto-editor-bubble-menu__table">
      {!isActive ? (
        <>
          <input
            autoFocus
            className="neeto-editor-bubble-menu-table__input"
            data-cy="neeto-editor-fixed-menu-table-option-input"
            min="1"
            placeholder={t("placeholders.rows")}
            type="number"
            value={rows}
            onChange={e => setRows(e.target.value)}
          />
          <input
            className="neeto-editor-bubble-menu-table__input"
            data-cy="neeto-editor-bubble-menu-table-option-input"
            min="1"
            placeholder={t("placeholders.columns")}
            type="number"
            value={columns}
            onChange={e => setColumns(e.target.value)}
          />
          <div>
            <Button
              data-cy="neeto-editor-bubble-menu-table-option-create-button"
              icon={Check}
              style="icon"
              onClick={handleSubmit}
            />
            <Button
              data-cy="neeto-editor-bubble-menu-table-option-create-button"
              icon={Close}
              style="icon"
              onClick={handleClose}
            />
          </div>
        </>
      ) : (
        <div className="neeto-editor-bubble-menu__table_options">
          {TABLE_ACTIONS({ editor }).map(({ label, command }) => (
            <Button key={label} label={label} style="text" onClick={command} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TableOption;
