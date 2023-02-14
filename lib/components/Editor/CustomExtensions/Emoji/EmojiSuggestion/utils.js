import { EMOJI_PRIORITIES } from "./constants";

export const filterEmojiSuggestions = emojiSuggestions =>
  emojiSuggestions
    .sort((a, b) => {
      const priorityA = EMOJI_PRIORITIES[a.id];
      const priorityB = EMOJI_PRIORITIES[b.id];
      if (priorityA && priorityB) {
        return priorityA - priorityB;
      } else if (priorityA) {
        return -1;
      } else if (priorityB) {
        return 1;
      }

      return a.name.localeCompare(b.name);
    })
    .slice(0, 5);
