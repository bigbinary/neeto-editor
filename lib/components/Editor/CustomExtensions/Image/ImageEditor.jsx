import React, { useState } from "react";

import Button from "components/Common/Button";
import Input from "components/Common/Input";

const ImageEditor = ({ url, editor, onClose, alt }) => {
  const [altText, setAltText] = useState(alt || "");
  const [isError, setIsError] = useState(false);

  const handleSubmit = () => {
    editor.chain().focus().setImage({ src: url, alt: altText }).run();
    onClose();
  };

  const handleKeyDown = event => {
    event.key === "Enter" && handleSubmit();
  };

  return (
    <div className="neeto-editor-image-editor" onKeyDown={handleKeyDown}>
      {isError ? (
        <div className="neeto-editor-image-editor__error">
          <h2>Something Went Wrong!</h2>
          <p>
            The selected image cannot be displayed. Please try again using
            another image.
          </p>
        </div>
      ) : (
        <>
          <figure>
            <img
              src={url}
              loading="lazy"
              onError={({ currentTarget }) => {
                setIsError(true);
                currentTarget.onerror = null;
              }}
            />
          </figure>
          <Input
            autoFocus
            value={altText}
            onChange={e => setAltText(e.target.value)}
            placeholder="Brand Image"
            label="Caption"
          />
        </>
      )}
      <div className="neeto-editor-image-editor__footer">
        <Button label="Proceed" disabled={isError} onClick={handleSubmit} />
        <Button label="Cancel" style="text" onClick={onClose} />
      </div>
    </div>
  );
};

export default ImageEditor;
