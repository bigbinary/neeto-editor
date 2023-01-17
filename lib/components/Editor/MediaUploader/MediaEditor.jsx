import React, { useState } from "react";

import { LeftArrow } from "@bigbinary/neeto-icons";
import { Button, Input } from "neetoui";

const MediaEditor = ({
  isImage,
  url,
  editor,
  onClose,
  alt = "",
  setMediaUrl,
}) => {
  const [altText, setAltText] = useState(alt || "");
  const [isError, setIsError] = useState(false);

  const handleSubmit = () => {
    isImage
      ? editor
          .chain()
          .focus()
          .setFigure({ src: url, caption: altText, alt: altText })
          .run()
      : editor
          .chain()
          .focus()
          .setVideo({ src: url, caption: altText, alt: altText })
          .run();
    onClose();
  };

  const handleKeyDown = event => {
    event.key === "Enter" && handleSubmit();
  };

  return (
    <div className="ne-media-editor" onKeyDown={handleKeyDown}>
      <Button
        icon={LeftArrow}
        iconPosition="left"
        label="back"
        size="small"
        style="text"
        onClick={() => setMediaUrl("")}
      />
      {isError ? (
        <div className="ne-media-editor__error">
          <h2>Something Went Wrong!</h2>
          <p>The selected media cannot be displayed. Please try again.</p>
        </div>
      ) : (
        <>
          {isImage ? (
            <img
              loading="lazy"
              src={url}
              onError={({ currentTarget }) => {
                setIsError(true);
                currentTarget.onerror = null;
              }}
            />
          ) : (
            <video
              src={url}
              onError={({ currentTarget }) => {
                setIsError(true);
                currentTarget.onerror = null;
              }}
            />
          )}
          <Input
            autoFocus
            label="Caption"
            placeholder="Enter a caption"
            value={altText}
            onChange={e => setAltText(e.target.value)}
          />
        </>
      )}
      <div className="ne-media-editor__footer">
        <Button disabled={isError} label="Done" onClick={handleSubmit} />
        <Button label="Cancel" style="text" onClick={onClose} />
      </div>
    </div>
  );
};

export default MediaEditor;
