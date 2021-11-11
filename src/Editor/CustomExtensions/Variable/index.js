import React, { useState, useRef } from "react";

import VariableList from "./VariableList";
import { HashtagFilled } from "../../../Common/Icons";

import useOutsideClick from "../../../hooks/useOutsideClick";
import { MENU_ICON_SIZE } from "../FixedMenu/constants";

const Variables = ({ editor, variables }) => {
  const containerRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick({ ref: containerRef, onClick: () => setIsOpen(false) });

  const handleClickItem = (item) => {
    const { category_key, key } = item;
    const variableName = category_key ? `${category_key}.${key}` : key;
    editor.chain().focus().setVariable({ label: variableName }).run();
  };

  if (!(variables && variables.length)) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative p-3 cursor-pointer hover:bg-gray-50 hover:shadow variable-selection-popup"
      onClick={() => setIsOpen((isOpen) => !isOpen)}
    >
      <HashtagFilled size={MENU_ICON_SIZE} />
      {isOpen ? (
        <div className="absolute right-2 items-container">
          <VariableList
            onClickVariable={handleClickItem}
            variables={variables}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Variables;
