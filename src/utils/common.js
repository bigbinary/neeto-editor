import { isNotPresent } from "neetocist";

import { NON_EMPTY_TAGS } from "./constants";

export const isEditorEmpty = htmlContent => {
  if (isNotPresent(htmlContent)) return true;

  if (NON_EMPTY_TAGS.some(tag => htmlContent.includes(tag))) return false;

  const element = document.createElement("div");
  element.innerHTML = htmlContent;
  const editorIsEmpty = isNotPresent(element.textContent?.trim());
  element.remove();

  return editorIsEmpty;
};

export const isEditorContentWithinLimit = (htmlContent, maxLength) => {
  if (isNotPresent(htmlContent)) return true;

  const element = document.createElement("div");
  element.innerHTML = htmlContent;
  const isLengthWithinLimit = element.textContent.length <= maxLength;
  element.remove();

  return isLengthWithinLimit;
};
