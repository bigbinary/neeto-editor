import React from "react";

import VariableList from "./VariableList";

const VariableSuggestion = ({ items, command }) => {
  return (
    <VariableList
      variables={items}
      onClickVariable={(variable) => {
        const { category_key, key } = variable;
        const variableName = category_key ? `${category_key}.${key}` : key;
        command({ label: variableName, id: variableName });
      }}
    />
  );
};

export default VariableSuggestion;
