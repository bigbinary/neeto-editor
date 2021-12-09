import React from "react";

import VariableList from "./VariableList";
import Dropdown from "components/Common/Dropdown";
import { HashtagFilled } from "components/Common/Icons";

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
        <button
          type="button"
          className="relative h-full p-3 editor-fixed-menu--item variable-selection-popup"
        >
          <HashtagFilled size={MENU_ICON_SIZE} />
        </button>
      )}
    >
      <div className="items-container">
        <VariableList onClickVariable={handleClickItem} variables={variables} />
      </div>
    </Dropdown>
  );
};

export default Variables;
