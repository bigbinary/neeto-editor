import React from "react";

import { parseVariables } from "./helpers";

const VariableList = ({ onClickVariable, variables }) => {
  const parsedVariables = parseVariables(variables);

  if (!(variables && variables.length)) {
    return null;
  }

  return (
    <div className="neeto-editor-variables-list">
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
    <div className="neeto-editor-variables-block">
      {title && <h6>{title}</h6>}
      <div className="neeto-editor-variables-row">
        {variables.map((item) => (
          <button
            type="button"
            onClick={() => onClickItem(item)}
            key={`${item.label}--${item.value}`}
            className="neeto-editor-variable"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
