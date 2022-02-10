import React, { useState } from "react";

import Button from "components/Common/Button";
import Input from "components/Common/Input";

const ImageEditor = ({ url, editor, onClose, alt }) => {
  const [altText, setAltText] = useState(alt || "");

  const handleSubmit = () => {
    editor.chain().focus().setImage({ src: url, alt: altText }).run();
    onClose();
  };

  const handleKeyDown = (event) => {
    event.key === "Enter" && handleSubmit();
  };

  return (
    <div className="neeto-editor-image-editor" onKeyDown={handleKeyDown}>
      <img src={url} />
      <Input
        value={altText}
        onChange={(e) => setAltText(e.target.value)}
        placeholder="Brand Image"
        label="Alt Text"
        className="neeto-editor-image-editor__input"
      />
      <Button label="Done" size="large" onClick={handleSubmit} />
    </div>
  );
};

export default ImageEditor;
