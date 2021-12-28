import React from "react";

const CharacterCount = ({ editor, characterLimit }) => {
  return (
    <p className="neeto-editor-character-count">
      {characterLimit
        ? `${
            characterLimit - editor?.storage?.characterCount?.characters()
          } characters remaining`
        : `${editor?.storage?.characterCount?.characters()} characters, ${editor?.storage?.characterCount?.words()} words`}
    </p>
  );
};

export default CharacterCount;
