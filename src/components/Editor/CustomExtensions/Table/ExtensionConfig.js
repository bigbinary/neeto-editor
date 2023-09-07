import TiptapTable from "@tiptap/extension-table";

import { TableView } from "./TableView";

const Table = TiptapTable.extend({
  addAttributes() {
    return {
      "data-dos-and-donts": {
        default: false,
        parseHTML: element => element.getAttribute("data-dos-and-donts"),
      },
    };
  },

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
      col => ["col", { style: `width: ${col.attrs?.colwidth || 100}px;` }]
    );

    const tableAttributes = node.attrs?.["data-dos-and-donts"]
      ? { "data-dos-and-donts": "" }
      : {};

    return ["table", tableAttributes, ["colgroup", ...colgroups], ["tbody", 0]];
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
