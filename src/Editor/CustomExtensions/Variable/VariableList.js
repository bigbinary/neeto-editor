import React from "react";

import { parseVariables } from "./helpers";

const VariableList = ({ onClickVariable, variables }) => {
  const parsedVariables = parseVariables(variables);

  if (!(variables && variables.length)) {
    return null;
  }

  return (
    <div className="p-3 bg-white shadow-md">
      {parsedVariables.map(({ label, variables }) => (
        <VariableCategory
          key={label}
          title={label}
          variables={variables}
          onClickItem={onClickVariable}
        />
      ))}
    </div>
  );
};

export default VariableList;

const VariableCategory = ({ title, variables, onClickItem }) => {
  return (
    <div className="my-3">
      <p className="text-xs font-semibold">{title}</p>
      {variables.map((item) => (
        <button
          onClick={() => onClickItem(item)}
          key={`${item.label}--${item.value}`}
          className="p-1 m-1 text-xs text-white bg-blue-400"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
