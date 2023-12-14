import { isNil, isEmpty } from "ramda";

import { NON_EMPTY_TAGS } from "./constants";

export const isNilOrEmpty = object => isNil(object) || isEmpty(object);

export const isEditorEmpty = htmlContent => {
  if (isNilOrEmpty(htmlContent)) return true;

  if (NON_EMPTY_TAGS.some(tag => htmlContent.includes(tag))) return false;

  const element = document.createElement("div");
  element.innerHTML = htmlContent;
  const editorIsEmpty = isNilOrEmpty(element.textContent?.trim());
  element.remove();

  return editorIsEmpty;
};

export const isEditorContentWithinLimit = (htmlContent, maxLength) => {
  if (isNilOrEmpty(htmlContent)) return true;

  const element = document.createElement("div");
  element.innerHTML = htmlContent;
  const isLengthWithinLimit = element.textContent?.trim().length <= maxLength;
  element.remove();

  return isLengthWithinLimit;
};
