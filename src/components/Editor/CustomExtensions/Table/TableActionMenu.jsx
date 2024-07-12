import React, { useCallback } from "react";

import { BubbleMenu } from "@tiptap/react";
import { Button } from "neetoui";
import { sticky } from "tippy.js";

import { tableActions } from "./utils";

const TableActionMenu = ({ editor }) => {
  const getReferenceClientRect = useCallback(() => {
    if (!editor) return new DOMRect(0, 0, 0, 0);

    const { state: { selection: { $anchor: anchor } = {} } = {} } = editor;
    const node = editor.view.domAtPos(anchor.pos).node;
    const element = node.nodeType === 3 ? node.parentElement : node;

    return element.getBoundingClientRect() || new DOMRect(0, 0, 0, 0);
  }, [editor]);

  const shouldShow = useCallback(() => editor?.isActive("table"), [editor]);

  if (!editor) return null;

  return (
    <BubbleMenu
      {...{ editor, shouldShow }}
      className="neeto-editor-bubble-menu"
      tippyOptions={{
        arrow: false,
        offset: [65, 8],
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
      {tableActions({ editor }).map(({ icon, label, command }) => (
        <Button
          {...{ icon }}
          iconSize={18}
          key={label}
          size="small"
          style="text"
          tooltipProps={{ content: label, position: "top", delay: [500] }}
          onClick={command}
        />
      ))}
      {/* <Dropdown
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
      </Dropdown> */}
    </BubbleMenu>
  );
};

export default TableActionMenu;
