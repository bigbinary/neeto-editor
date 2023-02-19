import TiptapTable from "@tiptap/extension-table";

import TableView from "./TableView";

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
});

export default Table.configure({});
