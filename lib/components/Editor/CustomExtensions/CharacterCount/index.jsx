import React from "react";

const CharacterCountWrapper = ({ editor, isActive, children }) => {
  if (!isActive || !editor) return children;

  return (
    <>
      {children}
      <p
        className="neeto-editor-character-count"
        data-cy="neeto-editor-character-count"
      >
        {editor.storage.characterCount.characters()} characters
      </p>
    </>
  );
};

export default CharacterCountWrapper;
