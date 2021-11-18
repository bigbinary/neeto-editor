export const hyphenize = (string) => {
  const fallbackString = "nui";

  if (string && string.replace) {
    return string
      .replace(/[\s_]/g, "-")
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/-+/g, "-")
      .toLowerCase();
  } else {
    return fallbackString;
  }
};

export const hasOwn = (obj, key) =>
  Object.prototype.hasOwnProperty.call(obj, key);
