import { EDITOR_CONTENT_CLASSNAME } from "constants/common";

export default (editor, className) => () => {
  if (!editor) return "";

  const classNameString = `${EDITOR_CONTENT_CLASSNAME} ${className || ""}`;
  return `<div class="${classNameString}">${editor.getHTML()}</div`;
};
