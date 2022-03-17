import React from "react";

const CharacterCount = ({ count, limit, strategy }) => {
  if (strategy === "hidden") return null;

  const characterLimitActive = strategy === "limit" && limit;

  return (
    <p
      className="neeto-editor-character-count"
      data-cy="neeto-editor-character-count"
    >
      {characterLimitActive
        ? `${limit - count} characters remaining`
        : `${count} characters`}
    </p>
  );
};

export default CharacterCount;
