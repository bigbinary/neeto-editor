import React from "react";

import { parseVariables } from "./helpers";

const VariableList = ({ onClickVariable, variables }) => {
  const parsedVariables = parseVariables(variables);

  if (!(variables && variables.length)) {
    return null;
  }

  return (
    <div className="neeto-editor-variables-list">
      {parsedVariables.map(({ label, variables }, index) => (
        <VariableCategory
          key={index}
          index={index}
          title={label}
          variables={variables}
          onClickItem={onClickVariable}
        />
      ))}
    </div>
  );
};

const VariableCategory = ({ index, title, variables, onClickItem }) => (
  <div
    className="neeto-editor-variables-block"
    data-cy={`neeto-editor-variable-option-category-${index}`}
  >
    {title && <h6>{title}</h6>}
    <div className="neeto-editor-variables-row">
      {variables.map(item => (
        <button
          type="button"
          onClick={() => onClickItem(item)}
          key={`${item.label}--${item.value}`}
          className="neeto-editor-variable"
          data-cy={`neeto-editor-variable-option-item-${item.label}--${item.value}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>
);

export default VariableList;
