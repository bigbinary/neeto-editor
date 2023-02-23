import React, { useState } from "react";

import { Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { useTranslation } from "react-i18next";

const TableOption = ({ editor, handleClose }) => {
  const { t } = useTranslation();

  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);

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
      <input
        autoFocus
        className="neeto-editor-bubble-menu-table__input"
        data-cy="neeto-editor-fixed-menu-table-option-input"
        placeholder={t("placeholders.rows")}
        type="number"
        value={rows}
        onChange={e => setRows(e.target.value)}
      />
      <input
        className="neeto-editor-bubble-menu-table__input"
        data-cy="neeto-editor-fixed-menu-table-option-input"
        placeholder={t("placeholders.columns")}
        type="number"
        value={columns}
        onChange={e => setColumns(e.target.value)}
      />
      <div>
        <Button
          data-cy="neeto-editor-fixed-menu-table-option-create-button"
          icon={Check}
          style="icon"
          onClick={handleSubmit}
        />
        <Button
          data-cy="neeto-editor-fixed-menu-table-option-create-button"
          icon={Close}
          style="icon"
          onClick={handleClose}
        />
      </div>
    </div>
  );
};

export default TableOption;
