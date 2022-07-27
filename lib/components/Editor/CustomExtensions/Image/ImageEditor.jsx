import React, { useState } from "react";

import Button from "components/Common/Button";
import Input from "components/Common/Input";

const ImageEditor = ({ url, editor, onClose, alt }) => {
  const [altText, setAltText] = useState(alt || "");

  const handleSubmit = () => {
    editor.chain().focus().setImage({ src: url, alt: altText }).run();
    onClose();
  };

  const handleKeyDown = event => {
    event.key === "Enter" && handleSubmit();
  };

  return (
    <div className="neeto-editor-image-editor" onKeyDown={handleKeyDown}>
      <figure>
        <img src={url} loading="lazy" />
      </figure>
      <Input
        autoFocus
        value={altText}
        onChange={e => setAltText(e.target.value)}
        placeholder="Brand Image"
        label="Caption"
      />
      <div className="neeto-editor-image-editor__footer">
        <Button size="large" label="Proceed" onClick={handleSubmit} />
        <Button size="large" label="Cancel" style="text" onClick={onClose} />
      </div>
    </div>
  );
};

export default ImageEditor;
