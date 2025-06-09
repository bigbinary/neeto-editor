import { useCallback } from "react";

import { BubbleMenu } from "@tiptap/react";
import { Button } from "neetoui";
import { sticky } from "tippy.js";

import { tableActions } from "./utils";

const TableActionMenu = ({ editor }) => {
  const getReferenceClientRect = useCallback(() => {
    if (!editor) return new DOMRect(0, 0, 0, 0);

    const { $anchor: anchor } = editor.state?.selection ?? {};
    const node = editor.view.domAtPos(anchor?.pos)?.node;
    const element = node?.nodeType === 3 ? node?.parentElement : node;

    return element?.getBoundingClientRect() || new DOMRect(0, 0, 0, 0);
  }, [editor]);

  const shouldShow = useCallback(() => editor?.isActive("table"), [editor]);

  if (!editor) return null;

  return (
    <BubbleMenu
      {...{ editor, shouldShow }}
      className="neeto-editor-bubble-menu"
      tippyOptions={{
        arrow: false,
        offset: [10, 10],
        zIndex: 99999,
        theme: "light neeto-editor-bubble-menu-tippy-box",
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        getReferenceClientRect,
        plugins: [sticky],
        sticky: "popper",
      }}
    >
      {shouldShow &&
        tableActions({ editor }).map(
          ({ icon, label, command, isHidden }) =>
            !isHidden && (
              <Button
                {...{ icon }}
                className="neeto-editor-table-bubble-menu__item"
                iconSize={18}
                key={label}
                size="small"
                style="text"
                tooltipProps={{
                  content: label,
                  position: "top",
                  delay: [500],
                }}
                onClick={command}
              />
            )
        )}
    </BubbleMenu>
  );
};

export default TableActionMenu;
