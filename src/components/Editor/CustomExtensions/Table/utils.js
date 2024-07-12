import { t } from "i18next";
import {
  TextBold,
  TextItalic,
  Delete,
  TextCross,
  Highlight,
  Merge,
  Header,
} from "neetoicons";

export const tableActions = ({ editor }) => [
  {
    label: t("neetoEditor.table.deleteRow"),
    command: () => editor.chain().focus().deleteRow().run(),
    icon: TextBold,
  },
  {
    label: t("neetoEditor.table.deleteColumn"),
    command: () => editor.chain().focus().deleteColumn().run(),
    icon: TextItalic,
  },
  {
    label: t("neetoEditor.table.delete"),
    command: () => editor.commands.deleteTable(),
    icon: Delete,
  },
  {
    label: t("neetoEditor.table.insertRow"),
    command: () => editor.commands.addRowAfter(),
    icon: TextCross,
  },
  {
    label: t("neetoEditor.table.insertColumn"),
    command: () => editor.commands.addColumnAfter(),
    icon: Highlight,
  },
  {
    label: t("neetoEditor.table.mergeSplit"),
    command: () => editor.chain().focus().mergeOrSplit().run(),
    icon: Merge,
  },
  {
    label: t("neetoEditor.table.toggleHeaderRow"),
    command: () => editor.chain().focus().toggleHeaderRow().run(),
    icon: Header,
  },
];
