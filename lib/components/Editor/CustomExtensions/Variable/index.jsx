import React, { useRef } from "react";

import { Braces } from "neetoicons";
import { isEmpty } from "ramda";

import Dropdown from "components/Common/Dropdown";
import MenuButton from "components/Common/MenuButton";

import VariableList from "./VariableList";

const Variables = ({ editor, variables }) => {
  const dropdownRef = useRef();
  const { Menu } = Dropdown;

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
      ref={dropdownRef}
      customTarget={() => (
        <MenuButton
          data-cy="neeto-editor-variable-option"
          icon={Braces}
          iconActive={dropdownRef?.current?._tippy?.state?.isVisible}
          tooltipProps={{
            content: "Variables",
            position: "bottom",
            delay: [500],
          }}
        />
      )}
    >
      <Menu>
        <VariableList variables={variables} onClickVariable={handleClickItem} />
      </Menu>
    </Dropdown>
  );
};

export default Variables;
