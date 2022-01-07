import React from "react";

const CharacterCount = ({ editor, limit, strategy }) => {
  if (strategy === "hidden") {
    return null;
  }

  const characterLimitActive = strategy === "limit" && limit;

  return (
    <p className="neeto-editor-character-count">
      {characterLimitActive
        ? `${
            limit - editor?.storage?.characterCount?.characters()
          } characters remaining`
        : `${editor?.storage?.characterCount?.characters()} characters, ${editor?.storage?.characterCount?.words()} words`}
    </p>
  );
};

export default CharacterCount;
