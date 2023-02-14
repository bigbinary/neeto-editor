import { EMOJI_PRIORITIES_LIST } from "./constants";

export const filterEmojiSuggestions = emojiSuggestions =>
  emojiSuggestions
    .sort((a, b) => {
      const aIndex = EMOJI_PRIORITIES_LIST.indexOf(a.id);
      const bIndex = EMOJI_PRIORITIES_LIST.indexOf(b.id);
      if (aIndex === -1 && bIndex === -1) {
        return 0;
      } else if (aIndex === -1) {
        return 1;
      } else if (bIndex === -1) {
        return -1;
      }

      return aIndex - bIndex;
    })
    .slice(0, 5);
