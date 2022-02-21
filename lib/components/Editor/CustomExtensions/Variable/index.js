import React from "react";

import VariableList from "./VariableList";
import Dropdown from "components/Common/Dropdown";
import { HashtagFilled } from "components/Common/Icons";
import ToolTip from "components/Common/ToolTip";

import { MENU_ICON_SIZE } from "../FixedMenu/constants";

const Variables = ({ editor, variables }) => {
  const handleClickItem = (item) => {
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
        <ToolTip content="Variables" position="bottom">
          <button
            type="button"
            className="neeto-editor-fixed-menu__item"
            data-cy="neeto-editor-variable-option"
          >
            <HashtagFilled size={MENU_ICON_SIZE} />
          </button>
        </ToolTip>
      )}
    >
      <VariableList onClickVariable={handleClickItem} variables={variables} />
    </Dropdown>
  );
};

export default Variables;
