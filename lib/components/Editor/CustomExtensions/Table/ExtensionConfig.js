import TiptapTable from "@tiptap/extension-table";
import { ReactNodeViewRenderer } from "@tiptap/react";

import TableComponent from "./TableComponent";

const Table = TiptapTable.extend({
  addNodeView() {
    return ReactNodeViewRenderer(TableComponent);
  },
});

export default Table.configure({
  resizable: true,
  allowTableNodeSelection: true,
});
