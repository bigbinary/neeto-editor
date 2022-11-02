import { isNil, isEmpty, curry } from "ramda";

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

export const matchesImpl = (pattern, object, __parent = object) => {
  if (object === pattern) return true;

  if (typeof pattern === "function" && pattern(object, __parent)) return true;

  if (isNil(pattern) || isNil(object)) return false;

  if (typeof pattern !== "object") return false;

  return Object.entries(pattern).every(([key, value]) =>
    matchesImpl(value, object[key], __parent)
  );
};

export const matches = curry((pattern, object) => matchesImpl(pattern, object));

export const findIndexBy = curry((pattern, array) =>
  array.findIndex(matches(pattern))
);
