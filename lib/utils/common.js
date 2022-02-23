export const capitalize = (string) => {
  const fallbackString = "nui";

  if (string && string.replace) {
    return string
      .toLowerCase()
      .replace("-", " ")
      .replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase());
  } else {
    return fallbackString;
  }
};

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
