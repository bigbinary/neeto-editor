export const getEditorStyle = ({ strategy, style, ref }) => {
  const editorStyle = { ...style };
  if (editorStyle["min-height"]) {
    editorStyle.minHeight = editorStyle["min-height"];
    delete editorStyle["min-height"];
  }
  if (strategy === "flexible" && ref.current)
    editorStyle.height = ref.current.scrollHeight;
  return editorStyle;
};
