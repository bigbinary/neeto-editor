import React from "react";

import { Tag } from "neetoui";
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
        <Tag
          data-cy={`neeto-editor-variable-option-item-${item.label}--${item.value}`}
          key={`${item.label}--${item.value}`}
          label={item.label}
          style="secondary"
          className="neeto-ui-text-black
                    neeto-ui-border-gray-300 hover:neeto-ui-text-primary-800 hover:neeto-ui-border-primary-800 neeto-ui-leading-snug cursor-pointer px-2 ne_variable-tag"
          onClick={() => onClickItem(item)}
        />
      ))}
    </div>
  </div>
);

export default VariableList;
