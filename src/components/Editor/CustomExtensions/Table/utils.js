import { t } from "i18next";
import {
  DeleteRow,
  DeleteColumn,
  DeleteTable,
  InsertRow,
  InsertColumn,
  MergeSplit,
  ToggleHeaderRow,
} from "neetoicons";

export const tableActions = ({ editor }) => [
  {
    label: t("neetoEditor.table.insertRow"),
    command: () => editor.commands.addRowAfter(),
    icon: InsertRow,
    isVisible: true,
  },
  {
    label: t("neetoEditor.table.insertColumn"),
    command: () => editor.commands.addColumnAfter(),
    icon: InsertColumn,
    isVisible: true,
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
    isVisible: true,
  },
  {
    label: t("neetoEditor.table.mergeSplit"),
    command: () => editor.chain().focus().mergeOrSplit().run(),
    icon: MergeSplit,
  },
  {
    label: t("neetoEditor.table.toggleHeaderRow"),
    command: () => editor.chain().focus().toggleHeaderRow().run(),
    icon: ToggleHeaderRow,
    isVisible: editor.isActive("tableHeader"),
  },
  {
    label: t("neetoEditor.table.delete"),
    command: () => editor.commands.deleteTable(),
    icon: DeleteTable,
    isVisible: true,
  },
];
