import React from "react";

const CharacterCount = ({ count }) => (
  <p
    className="neeto-editor-character-count"
    data-cy="neeto-editor-character-count"
  >
    {count} characters
  </p>
);

export default CharacterCount;
