import React, { useCallback } from "react";

import { BubbleMenu } from "@tiptap/react";
import { Button, Dropdown } from "neetoui";
import { sticky } from "tippy.js";

import { getRenderContainer, tableActions } from "./utils";

const { Menu } = Dropdown;

const TableActionMenu = ({ editor }) => {
  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, "table");
    const rect =
      renderContainer?.getBoundingClientRect() || new DOMRect(0, 0, 0, 0);

    return rect;
  }, [editor]);

  const shouldShow = useCallback(() => editor?.isActive("table"), [editor]);

  if (!editor) return null;

  return (
    <BubbleMenu
      {...{ editor, shouldShow }}
      className="neeto-editor-bubble-menu"
      tippyOptions={{
        offset: [145, 8],
        zIndex: 99999,
        theme: "neeto-editor-bubble-menu",
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        getReferenceClientRect,
        plugins: [sticky],
        sticky: "popper",
      }}
    >
      <Dropdown
        buttonSize="small"
        buttonStyle="text"
        label="Options"
        position="auto"
        strategy="fixed"
        onClose={() => editor?.commands.focus()}
      >
        <Menu className="neeto-editor-bubble-menu__table__options">
          {tableActions({ editor }).map(({ label, command }) => (
            <Button key={label} {...{ label }} style="text" onClick={command} />
          ))}
        </Menu>
      </Dropdown>
    </BubbleMenu>
  );
};

export default TableActionMenu;
