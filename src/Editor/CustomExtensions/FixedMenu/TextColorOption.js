import React, { useRef } from "react";

const TextColorOption = ({ color = "#000", onChange }) => {
  const colorInputRef = useRef();

  return (
    <div
      onClick={() => colorInputRef.current?.click()}
      className="flex items-center justify-center w-10 h-10 cursor-pointer hover:bg-gray-50 hover:shadow"
    >
      <span
        className="font-bold leading-none text-gray-400 border-b-2"
        style={{ borderColor: color }}
      >
        A
      </span>
      <input
        ref={colorInputRef}
        type="color"
        className="invisible w-0 h-0"
        onChange={(event) => onChange && onChange(event.target.value)}
      />
    </div>
  );
};

export default TextColorOption;
