import TiptapTable from "@tiptap/extension-table";

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
  renderHTML({ node }) {
    const colgroups = node?.content?.content?.[0]?.content?.content?.map(
      col => {
        let style = "min-width: 100px;";
        if (col.attrs?.colwidth) style += `width: ${col.attrs.colwidth}px;`;

        return ["col", { style }];
      }
    );

    return ["table", {}, ["colgroup", ...colgroups], ["tbody", 0]];
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
