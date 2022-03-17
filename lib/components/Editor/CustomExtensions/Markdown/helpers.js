export const getEditorStyle = ({ strategy, style }) => {
  const editorStyle = { ...style };
  if (editorStyle["min-height"]) {
    if (strategy === "flexible")
      editorStyle.minHeight = editorStyle["min-height"];
    else editorStyle.height = editorStyle["min-height"];
    delete editorStyle["min-height"];
  }
  return editorStyle;
};
