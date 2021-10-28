/*  Helper function that accepts an array of variables and injects category to each item in the group
    And also performs grouping of indvidual variables under common category as 'Others'. */

export const parseVariables = (variableArr = []) => {
  const uncategorized = [];
  const groupedVariables = [];
  variableArr.forEach((variable) => {
    const { category_key, category_label, variables } = variable;
    if (category_key && variables) {
      const parsedVariables = variables.map((categoryVariable) => ({
        ...categoryVariable,
        category_key,
      }));
      groupedVariables.push({
        label: category_label,
        variables: parsedVariables,
      });
    } else uncategorized.push(variable);
  });
  if (uncategorized.length) {
    groupedVariables.push({ label: "Others", variables: uncategorized });
  }
  return groupedVariables;
};
