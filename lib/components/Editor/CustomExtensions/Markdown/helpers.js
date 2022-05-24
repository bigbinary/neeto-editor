const toggleMarkdownWordFormatting = (inputFieldRef, decoratorText = "") => {
  let decorator = decoratorText;
  const { current: textArea } = inputFieldRef;

  if (!textArea) return;

  const selectionStart = textArea.selectionStart;
  const selectionEnd = textArea.selectionEnd;
  const decoratorLength = decorator.length;
  let front = textArea.value.substring(0, selectionStart);
  let middle = textArea.value.substring(selectionStart, selectionEnd);
  let back = textArea.value.substring(selectionEnd, textArea.value.length);

  if (selectionStart === selectionEnd) return;

  if (front.endsWith(decorator) && back.startsWith(decorator)) {
    decorator = "";
    front = front.substring(0, front.length - decoratorLength);
    back = back.substring(decoratorLength, back.length);
  } else if (middle.startsWith(decorator) && middle.endsWith(decorator)) {
    decorator = "";
    middle = middle.substring(decoratorLength, middle.length - decoratorLength);
  }

  textArea.value = front + decorator + middle + decorator + back;
  textArea.selectionStart = textArea.selectionEnd = front.length;
};

const toggleMarkdownLineFormatting = (
  inputFieldRef,
  decorator,
  isOrderedList = false
) => {
  const { current: textArea } = inputFieldRef;

  if (!textArea) return;

  let firstLine = textArea.value
    .substring(0, textArea.selectionStart)
    .lastIndexOf("\n");
  let lastLine = textArea.value
    .substring(textArea.selectionEnd, textArea.value.length)
    .indexOf("\n");
  firstLine = firstLine === -1 ? 0 : firstLine + 1;
  lastLine =
    lastLine === -1 ? textArea.value.length : lastLine + textArea.selectionEnd;

  const front = textArea.value.substring(0, firstLine);
  const middle = textArea.value.substring(firstLine, lastLine);
  const back = textArea.value.substring(lastLine, textArea.value.length);

  if (
    middle.indexOf(decorator) === 0 ||
    (isOrderedList && middle.indexOf("1.") === 0)
  ) {
    const newMiddle = isOrderedList
      ? middle.replaceAll(/^\d+\.\s/gm, "")
      : middle.replaceAll(decorator, "");
    textArea.value = front + newMiddle + back;
  } else {
    let counter = 1;
    const newMiddle = isOrderedList
      ? middle.replaceAll("\n", () => `\n${++counter}. `)
      : middle.replaceAll("\n", `\n${decorator}`);
    textArea.value = front + (decorator || "1. ") + newMiddle + back;
  }
};

export const handleKeyDown = ({
  event,
  inputFieldRef,
  length,
  limit,
  onChange,
}) => {
  if (length >= limit && event.key !== "Backspace") event.preventDefault();
  else if (
    event.key === "b" &&
    (event.metaKey || event.ctrlKey) &&
    event.shiftKey
  ) {
    toggleMarkdownLineFormatting(inputFieldRef, "> ");
  } else if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
    toggleMarkdownWordFormatting(inputFieldRef, "**");
  } else if (event.key === "i" && (event.metaKey || event.ctrlKey)) {
    toggleMarkdownWordFormatting(inputFieldRef, "_");
  } else if (event.key === "u" && (event.metaKey || event.ctrlKey)) {
    toggleMarkdownWordFormatting(inputFieldRef, "--");
  } else if (
    event.key === "x" &&
    (event.metaKey || event.ctrlKey) &&
    event.shiftKey
  ) {
    toggleMarkdownWordFormatting(inputFieldRef, "~");
  } else if (
    event.key === "h" &&
    (event.metaKey || event.ctrlKey) &&
    event.shiftKey
  ) {
    toggleMarkdownWordFormatting(inputFieldRef, "==");
  } else if (
    event.key === "7" &&
    (event.metaKey || event.ctrlKey) &&
    event.shiftKey
  ) {
    toggleMarkdownLineFormatting(inputFieldRef, null, true);
  } else if (
    event.key === "8" &&
    (event.metaKey || event.ctrlKey) &&
    event.shiftKey
  ) {
    toggleMarkdownLineFormatting(inputFieldRef, "- ");
  } else return;

  onChange(inputFieldRef.current.value);
};

export const getEditorStyle = ({ strategy, style, ref }) => {
  const editorStyle = { ...style };
  if (editorStyle["min-height"]) {
    editorStyle.minHeight = editorStyle["min-height"];
    delete editorStyle["min-height"];
  }

  if (strategy === "flexible" && ref.current) {
    editorStyle.height = ref.current.scrollHeight;
  }

  return editorStyle;
};
