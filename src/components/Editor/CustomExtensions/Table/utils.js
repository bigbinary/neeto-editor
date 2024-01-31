import { t } from "i18next";

export const getRenderContainer = (editor, nodeType) => {
  const elements = document.querySelectorAll(".has-focus");
  const elementCount = elements.length;
  const innermostNode = elements[elementCount - 1];
  const element = innermostNode;

  if (
    (element &&
      element.getAttribute("data-type") &&
      element.getAttribute("data-type") === nodeType) ||
    (element && element.classList && element.classList.contains(nodeType))
  ) {
    return element;
  }

  const node = editor?.view.domAtPos(editor?.state?.selection?.from).node;
  let container = node;

  if (!container.tagName) {
    container = node.parentElement;
  }
  while (
    container &&
    !(
      container.tagName &&
      container.tagName.toLowerCase() === nodeType.toLowerCase()
    ) &&
    !container.classList.contains(nodeType)
  ) {
    container = container.parentElement;
  }

  return container;
};

export const tableActions = ({ editor }) => [
  {
    label: t("neetoEditor.table.deleteRow"),
    command: () => editor.chain().focus().deleteRow().run(),
  },
  {
    label: t("neetoEditor.table.deleteColumn"),
    command: () => editor.chain().focus().deleteColumn().run(),
  },
  {
    label: t("neetoEditor.table.delete"),
    command: () => editor.commands.deleteTable(),
  },
  {
    label: t("neetoEditor.table.insertRow"),
    command: () => editor.commands.addRowAfter(),
  },
  {
    label: t("neetoEditor.table.insertColumn"),
    command: () => editor.commands.addColumnAfter(),
  },
  {
    label: t("neetoEditor.table.mergeSplit"),
    command: () => editor.chain().focus().mergeOrSplit().run(),
  },
  {
    label: t("neetoEditor.table.toggleHeaderRow"),
    command: () => editor.chain().focus().toggleHeaderRow().run(),
  },
];
