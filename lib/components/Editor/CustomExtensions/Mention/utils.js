import Fuse from "fuse.js";
import { pluck } from "ramda";

export const formatMentions = (users = []) =>
  users.sort((user1, user2) => user1.name.localeCompare(user2.name));

export const createMentionSuggestions = (users = []) => {
  const mentions = formatMentions(users);

  return ({ query }) => {
    if (!query) {
      return mentions;
    }

    const options = {
      keys: ["name"],
      threshold: 0.6,
      includeScore: true,
      sortFn: (a, b) => b.score - a.score,
    };

    const fuse = new Fuse(mentions, options);

    const results = fuse.search(query);

    return pluck("item", results);
  };
};
