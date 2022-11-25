import { isNil, isEmpty } from "ramda";

export const slugify = string =>
  string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text

export const humanize = string => {
  string = string
    .replace(/[_-]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/([a-z\d])([A-Z])/g, "$1" + " " + "$2")
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + " " + "$2")
    .toLowerCase()
    .trim();
  string = string.charAt(0).toUpperCase() + string.slice(1);

  return string;
};

export const isNilOrEmpty = object => isNil(object) || isEmpty(object);

export const noop = () => {};

export const isEditorEmpty = htmlContent => {
  if (isNilOrEmpty(htmlContent)) return true;

  const element = document.createElement("div");
  element.innerHTML = htmlContent;
  const editorIsEmpty = isNilOrEmpty(element.textContent);
  element.remove();

  return editorIsEmpty;
};
