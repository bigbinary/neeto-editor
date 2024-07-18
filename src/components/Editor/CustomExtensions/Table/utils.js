import { t } from "i18next";
import { isNotPresent } from "neetocist";
import {
  DeleteRow,
  DeleteColumn,
  DeleteTable,
  InsertRow,
  InsertColumn,
  MergeSplit,
  ToggleHeaderRow,
} from "neetoicons";
import { CellSelection } from "prosemirror-tables";

const shouldShowMergeCellToggler = selection => {
  if (isNotPresent(selection)) return false;

  if (selection instanceof CellSelection) return true;

  let depth = selection.$from.depth;

  while (depth > 0) {
    const node = selection.$from.node(depth);
    const nodeRoleInTable = node?.type?.spec?.tableRole;
    if (nodeRoleInTable === "cell" || nodeRoleInTable === "header_cell") {
      const { colspan, rowspan } = node.attrs;

      return colspan > 1 || rowspan > 1;
    }
    depth -= 1;
  }

  return false;
};

export const tableActions = ({ editor }) => [
  {
    label: t("neetoEditor.table.insertRow"),
    command: () => editor.commands.addRowAfter(),
    icon: InsertRow,
  },
  {
    label: t("neetoEditor.table.insertColumn"),
    command: () => editor.commands.addColumnAfter(),
    icon: InsertColumn,
  },
  {
    label: t("neetoEditor.table.deleteRow"),
    command: () => editor.chain().focus().deleteRow().run(),
    icon: DeleteRow,
    isVisible: true,
  },
  {
    label: t("neetoEditor.table.deleteColumn"),
    command: () => editor.chain().focus().deleteColumn().run(),
    icon: DeleteColumn,
  },
  {
    label: t("neetoEditor.table.mergeSplit"),
    command: () => editor.chain().focus().mergeOrSplit().run(),
    icon: MergeSplit,
    isHidden: !shouldShowMergeCellToggler(editor.state?.selection),
  },
  {
    label: t("neetoEditor.table.toggleHeaderRow"),
    command: () => editor.chain().focus().toggleHeaderRow().run(),
    icon: ToggleHeaderRow,
  },
  {
    label: t("neetoEditor.table.delete"),
    command: () => editor.commands.deleteTable(),
    icon: DeleteTable,
  },
];
