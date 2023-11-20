import Fuse from "fuse.js";
import { pluck } from "ramda";

export const createMentionSuggestions =
  (mentions = []) =>
  ({ query }) => {
    if (!query) {
      return mentions.slice(0, 10);
    }

    const options = { keys: ["name"], threshold: 0.25 };
    const fuse = new Fuse(mentions, options);
    const results = fuse.search(query).slice(0, 10);

    return pluck("item", results);
  };
