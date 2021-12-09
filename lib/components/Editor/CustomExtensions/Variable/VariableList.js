import React from "react";

import { parseVariables } from "./helpers";

const VariableList = ({ onClickVariable, variables }) => {
  const parsedVariables = parseVariables(variables);

  if (!(variables && variables.length)) {
    return null;
  }

  return (
    <div className="p-3 bg-white">
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
      {title ? <p className="text-xs font-semibold">{title}</p> : null}
      <div className="mt-1 space-x-2">
        {variables.map((item) => (
          <button
            type="button"
            onClick={() => onClickItem(item)}
            key={`${item.label}--${item.value}`}
            className="px-2 py-1 text-xs text-white bg-blue-400 rounded-sm"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
