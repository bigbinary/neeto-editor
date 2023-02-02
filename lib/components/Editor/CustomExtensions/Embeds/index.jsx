import React, { useRef, useState } from "react";

import { Button, Input, Modal, Typography } from "neetoui";
import { isEmpty } from "ramda";

import { validateUrl } from "./utils";

const EmbedOption = ({ isEmbedModalOpen, setIsEmbedModalOpen, editor }) => {
  const [embedUrl, setEmbedUrl] = useState("");
  const [error, setError] = useState(false);

  const inputRef = useRef(null);

  const handleEmbed = () => {
    const validatedUrl = validateUrl(embedUrl);

    if (validatedUrl) {
      editor.chain().focus().setExternalVideo({ src: validatedUrl }).run();
      setEmbedUrl("");
      setIsEmbedModalOpen(false);
    } else {
      setError(true);
    }
  };

  const handleChange = e => {
    if (validateUrl(e.target.value)) {
      setError(false);
      setEmbedUrl(e.target.value);
    } else {
      setError(true);
      setEmbedUrl(e.target.value);
    }
  };

  const handleClose = () => {
    setEmbedUrl("");
    setError(false);
    setIsEmbedModalOpen(false);
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleEmbed();
    } else if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <Modal
      initialFocusRef={inputRef}
      isOpen={isEmbedModalOpen}
      onClose={handleClose}
    >
      <div className="ne-embed-modal">
        <Modal.Header>
          <Typography style="h2">Embed Video</Typography>
        </Modal.Header>
        <Modal.Body className="space-y-2">
          <Input
            error={error && "Please enter a valid URL"}
            label="Video URL:"
            ref={inputRef}
            size="medium"
            type="text"
            value={embedUrl}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </Modal.Body>
        <Modal.Footer className="space-x-2">
          <Button
            disabled={error || isEmpty(embedUrl)}
            label="Embed"
            onClick={handleEmbed}
          />
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default EmbedOption;
