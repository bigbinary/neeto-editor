import React, { useState, useRef } from "react";

import useOutsideClick from "../../../hooks/useOutsideClick";
import { parseVariables } from "./helpers";

const Variables = ({ editor, variables }) => {
  const containerRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick({ ref: containerRef, onClick: () => setIsOpen(false) });

  const parsedVariables = parseVariables(variables);

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
      <span className="text-gray-400">{"{}"}</span>
      {isOpen ? (
        <div className="absolute p-3 bg-white shadow-md right-2 items-container">
          {parsedVariables.map(({ label, variables }) => (
            <VariableCategory
              key={label}
              title={label}
              variables={variables}
              onClickItem={handleClickItem}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Variables;

const VariableCategory = ({ title, variables, onClickItem }) => {
  return (
    <div className="my-3">
      <p className="text-xs font-semibold">{title}</p>
      {variables.map((item) => (
        <button
          onClick={() => onClickItem(item)}
          key={`${item.label}--${item.value}`}
          className="p-1 m-1 text-xs text-white bg-blue-400"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
