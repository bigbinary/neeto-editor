import TiptapTable from "@tiptap/extension-table";
import { mergeAttributes } from "@tiptap/react";

import { TableView } from "./TableView";

const Table = TiptapTable.extend({
  addOptions() {
    return {
      HTMLAttributes: {},
      resizable: true,
      handleWidth: 5,
      cellMinWidth: 100,
      View: TableView,
      lastColumnResizable: true,
      allowTableNodeSelection: true,
    };
  },
  renderHTML({ node, HTMLAttributes }) {
    const colgroups = node?.content?.content?.[0]?.content?.content.map(col => [
      "col",
      { style: `width: ${col.attrs?.colwidth || 100}px;` },
    ]);

    return [
      "table",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      ["colgroup", ...colgroups],
      ["tbody", 0],
    ];
  },

  addKeyboardShortcuts() {
    return {
      ...this.parent?.(),
      "Mod-alt-t": () =>
        this.editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
    };
  },
});

export default Table.configure({});
