import React, { useRef } from "react";

import { Braces } from "neetoicons";

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

  if (!(variables && variables.length)) {
    return null;
  }

  return (
    <Dropdown
      ref={dropdownRef}
      customTarget={() => (
        <MenuButton
          icon={Braces}
          iconActive={dropdownRef?.current?._tippy?.state?.isVisible}
          tooltipProps={{
            content: "Variables",
            position: "bottom",
            delay: [500],
          }}
          data-cy="neeto-editor-variable-option"
        />
      )}
    >
      <Menu>
        <VariableList onClickVariable={handleClickItem} variables={variables} />
      </Menu>
    </Dropdown>
  );
};

export default Variables;
