import { isNil, isEmpty } from "ramda";

import { NON_EMPTY_TAGS } from "./constants";

export const isNilOrEmpty = object => isNil(object) || isEmpty(object);

export const isEditorEmpty = /*#__PURE__*/ htmlContent => {
  if (isNilOrEmpty(htmlContent)) return true;

  if (NON_EMPTY_TAGS.some(tag => htmlContent.includes(tag))) return false;

  const element = document.createElement("div");
  element.innerHTML = htmlContent;
  const editorIsEmpty = isNilOrEmpty(element.textContent?.trim());
  element.remove();

  return editorIsEmpty;
};
