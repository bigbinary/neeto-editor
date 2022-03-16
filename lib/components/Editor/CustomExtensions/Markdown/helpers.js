export const getEditorStyle = ({ strategy, style, inputRef }) => {
  const editorStyle = { ...style };
  if (editorStyle["min-height"]) {
    editorStyle.minHeight = editorStyle["min-height"];
    delete editorStyle["min-height"];
  }
  if (strategy === "flexible" && inputRef.current)
    editorStyle.height = inputRef.current.scrollHeight;
  return editorStyle;
};
