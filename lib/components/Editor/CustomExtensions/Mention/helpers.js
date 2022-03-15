import { hyphenize } from "utils/common";

export const createMentionSuggestions = (
  items = [],
  { showImage = false } = {}
) => {
  const mentions = items
    .map((item, index) => ({
      showImage,
      key: `${hyphenize(item.label)}-${index}`,
      ...item,
    }))
    .sort((mention1, mention2) => mention1.label.localeCompare(mention2.name));

  return ({ query }) =>
    mentions.filter((mention) =>
      mention.label.toLowerCase().includes(query.toLowerCase())
    );
};
