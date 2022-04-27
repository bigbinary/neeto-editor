const applyMarkdownFormatting = (inputFieldRef, decorator = "") => {
  const { current: textArea } = inputFieldRef;

  if (!textArea) return;

  const initialSelectionStart = textArea.selectionStart;
  const initialSelectionEnd = textArea.selectionEnd;
  const decoratorLength = decorator.length;
  let front = textArea.value.substring(0, initialSelectionStart);
  let middle = textArea.value.substring(
    initialSelectionStart,
    initialSelectionEnd
  );
  let back = textArea.value.substring(
    initialSelectionEnd,
    textArea.value.length
  );
  let mode = "insert";

  if (initialSelectionStart === initialSelectionEnd) return;

  if (
    front.substr(-decoratorLength) == decorator &&
    back.substr(0, decoratorLength) == decorator
  ) {
    decorator = "";
    front = front.substring(0, front.length - decoratorLength);
    back = back.substring(decoratorLength, back.length);
    mode = "delete";
  } else if (
    middle.substr(0, decoratorLength) == decorator &&
    middle.substr(-decoratorLength) == decorator
  ) {
    decorator = "";
    middle = middle.substring(decoratorLength, middle.length - decoratorLength);
  }

  textArea.value = front + decorator + middle + decorator + back;
  if (mode === "delete") {
    textArea.selectionStart = initialSelectionStart - decoratorLength;
    textArea.selectionEnd = initialSelectionEnd - decoratorLength;
  } else {
    textArea.selectionStart = initialSelectionStart + decoratorLength;
    textArea.selectionEnd = initialSelectionEnd + decoratorLength;
  }
};

export const handleKeyDown = ({ event, inputFieldRef, length, limit }) => {
  if (length >= limit && event.key !== "Backspace") event.preventDefault();
  else if (event.key === "b" && (event.metaKey || event.ctrlKey))
    applyMarkdownFormatting(inputFieldRef, "**");
  else if (event.key === "i" && (event.metaKey || event.ctrlKey))
    applyMarkdownFormatting(inputFieldRef, "_");
  else if (event.key === "u" && (event.metaKey || event.ctrlKey))
    applyMarkdownFormatting(inputFieldRef, "--");
  else if (
    event.key === "x" &&
    (event.metaKey || event.ctrlKey) &&
    event.shiftKey
  )
    applyMarkdownFormatting(inputFieldRef, "~");
  else if (
    event.key === "h" &&
    (event.metaKey || event.ctrlKey) &&
    event.shiftKey
  )
    applyMarkdownFormatting(inputFieldRef, "==");
};

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
