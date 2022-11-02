import React from "react";

import { isEmpty } from "ramda";

import { parseVariables } from "./utils";

const VariableList = ({ onClickVariable, variables }) => {
  const parsedVariables = parseVariables(variables);

  if (isEmpty(variables)) {
    return null;
  }

  return (
    <div className="neeto-editor-variables-list">
      {parsedVariables.map(({ label, variables }, index) => (
        <VariableCategory
          index={index}
          key={index}
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
          className="neeto-editor-variable"
          data-cy={`neeto-editor-variable-option-item-${item.label}--${item.value}`}
          key={`${item.label}--${item.value}`}
          type="button"
          onClick={() => onClickItem(item)}
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>
);

export default VariableList;
