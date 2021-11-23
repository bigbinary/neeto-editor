export const createMentionSuggestions = (
  items = [],
  { limit = 5, showImage = false } = {}
) => {
  const allSuggestions = items.map((item) => {
    let suggestionObj;
    if (typeof item === "string") {
      suggestionObj = { key: item, label: item };
    } else if (typeof item === "object") {
      suggestionObj = { ...item };
    }
    suggestionObj.showImage = showImage;

    return suggestionObj;
  });

  return ({ query }) =>
    allSuggestions
      .filter((suggestion) =>
        suggestion.label.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, limit);
};
