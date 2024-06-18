export const createMentionSuggestions =
  (mentions = []) =>
  ({ query }) => {
    if (!query) {
      return mentions.slice(0, 10);
    }

    return mentions
      .filter(mention =>
        mention.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 10);
  };
