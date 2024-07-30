export const updateAttributes = (attrs, editor, getPos) => {
  if (typeof getPos === "function") {
    editor
      .chain()
      .focus()
      .setNodeSelection(getPos())
      .updateAttributes("image", attrs)
      .run();
  }
};

export const deleteNode = (editor, getPos, node) => {
  if (typeof getPos === "function") {
    editor
      .chain()
      .focus()
      .deleteRange({ from: getPos(), to: getPos() + node.nodeSize })
      .run();
  }
};
