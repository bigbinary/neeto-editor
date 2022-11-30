export const buildArgValues = rows =>
  rows.reduce(
    (acc, value) => ({
      ...acc,
      [value[0]]: {
        name: value[0],
        description: value[1],
        control: false,
        table: {
          defaultValue: { summary: value[2] },
        },
      },
    }),
    {}
  );
