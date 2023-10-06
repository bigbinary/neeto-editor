import React from "react";

import { Settings } from "neetoicons";
import { Button, Dropdown } from "neetoui";

import { tableActions } from "./utils";

const { Menu } = Dropdown;

const TableActions = ({ editor, tooltipContent }) => {
  const isActive = editor.isActive("table");

  return (
    isActive && (
      <Dropdown
        buttonStyle="secondary"
        closeOnSelect={false}
        data-cy="neeto-editor-fixed-menu-link-option"
        icon={Settings}
        position="bottom"
        buttonProps={{
          tabIndex: -1,
          tooltipProps: { content: tooltipContent, position: "bottom" },
          className: "neeto-editor-fixed-menu__item",
        }}
      >
        <Menu className="neeto-editor-table__options-menu">
          {tableActions({ editor }).map(({ label, command }) => (
            <Button
              key={label}
              {...{ label }}
              size="small"
              style="text"
              onClick={command}
            />
          ))}
        </Menu>
      </Dropdown>
    )
  );
};

export default TableActions;
