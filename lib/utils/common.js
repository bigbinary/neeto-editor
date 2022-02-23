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

// Replace all spaces within tags with "nbsp;". This prevents tiptap editor from removing trailing spaces while typing.
export const replaceWithNonBreakingSpace = (value) => {
  if (typeof value !== "string") return "";
  return value.replaceAll(
    /<(\S*?)[^>]*>(.*?)<\/\1>/g,
    (_match, tag, content) =>
      `<${tag}>${content.replaceAll(" ", "&nbsp;")}</${tag}>`
  );
};
