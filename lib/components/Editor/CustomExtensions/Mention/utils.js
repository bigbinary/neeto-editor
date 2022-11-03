export const formatMentions = (users = []) =>
  users.sort((user1, user2) => user1.name.localeCompare(user2.name));

export const createMentionSuggestions = (users = []) => {
  const mentions = formatMentions(users);

  return ({ query }) =>
    mentions.filter(({ name }) =>
      name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
};
