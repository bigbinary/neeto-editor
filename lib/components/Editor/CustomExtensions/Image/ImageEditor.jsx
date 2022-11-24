import React, { useState } from "react";

import Button from "components/Common/Button";
import Input from "components/Common/Input";

const ImageEditor = ({ url, editor, onClose, alt = "" }) => {
  const [altText, setAltText] = useState(alt || "");
  const [isError, setIsError] = useState(false);

  const handleSubmit = () => {
    editor
      .chain()
      .focus()
      .setFigure({ src: url, caption: altText, alt: altText })
      .run();
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
              loading="lazy"
              src={url}
              onError={({ currentTarget }) => {
                setIsError(true);
                currentTarget.onerror = null;
              }}
            />
          </figure>
          <Input
            autoFocus
            label="Caption"
            placeholder="Brand Image"
            value={altText}
            onChange={e => setAltText(e.target.value)}
          />
        </>
      )}
      <div className="neeto-editor-image-editor__footer">
        <Button disabled={isError} label="Done" onClick={handleSubmit} />
        <Button label="Cancel" style="text" onClick={onClose} />
      </div>
    </div>
  );
};

export default ImageEditor;
