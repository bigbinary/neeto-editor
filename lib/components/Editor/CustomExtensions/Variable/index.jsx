import React from "react";

import VariableList from "./VariableList";
import Dropdown from "components/Common/Dropdown";
import { HashtagFilled } from "components/Common/Icons";
import MenuButton from "components/Common/MenuButton";

const Variables = ({ editor, variables }) => {
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
      customTarget={() => (
        <MenuButton
          icon={({ color, ...otherProps }) => <HashtagFilled {...otherProps} />}
          tooltipProps={{
            content: "Variables",
            position: "bottom",
            delay: [500],
          }}
          data-cy="neeto-editor-variable-option"
        />
      )}
    >
      <VariableList onClickVariable={handleClickItem} variables={variables} />
    </Dropdown>
  );
};

export default Variables;
