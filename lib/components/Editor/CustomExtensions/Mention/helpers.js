import { mergeLeft } from "ramda";

import { hyphenize } from "utils/common";

export const formatMentions = (users = [], showImage = false) =>
  users
    .map((user, index) =>
      mergeLeft(user, {
        showImage,
        key: `${hyphenize(user.name)}-${index}`,
      })
    )
    .sort((user1, user2) => user1.name.localeCompare(user2.name));

export const createMentionSuggestions = (users = [], showImage = false) => {
  const mentions = formatMentions(users, showImage);

  return ({ query }) =>
    mentions.filter(({ name }) =>
      name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
};
