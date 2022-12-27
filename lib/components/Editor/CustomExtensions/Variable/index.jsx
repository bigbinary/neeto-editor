import React from "react";

import { Braces } from "neetoicons";
import { Dropdown } from "neetoui";
import { isEmpty } from "ramda";

import VariableList from "./VariableList";

const { Menu } = Dropdown;

const Variables = ({ editor, variables }) => {
  const handleClickItem = item => {
    const { category_key, key } = item;
    const variableName = category_key ? `${category_key}.${key}` : key;
    editor.chain().focus().setVariable({ label: variableName }).run();
  };

  if (isEmpty(variables)) {
    return null;
  }

  return (
    <Dropdown
      buttonSize="small"
      buttonStyle="secondary"
      data-cy="neeto-editor-variable-option"
      icon={Braces}
      strategy="fixed"
      buttonProps={{
        tooltipProps: { content: "Variables", position: "bottom" },
      }}
    >
      <Menu>
        <VariableList variables={variables} onClickVariable={handleClickItem} />
      </Menu>
    </Dropdown>
  );
};

export default Variables;
