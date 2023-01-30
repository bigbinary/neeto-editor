import React, { useState } from "react";

import { Button, Input, Modal, Typography } from "neetoui";

import { validateUrl } from "./utils";

const EmbedOption = ({ isEmbedModalOpen, setIsEmbedModalOpen, editor }) => {
  const [embedUrl, setEmbedUrl] = useState("");
  const [error, setError] = useState(false);

  const handleEmbed = () => {
    editor.chain().focus().setExternalVideo({ src: embedUrl }).run();
    setIsEmbedModalOpen(false);
  };

  const handleChange = e => {
    const validatedUrl = validateUrl(e.target.value);
    if (validatedUrl) {
      setError(false);
      setEmbedUrl(validatedUrl);
    } else {
      setError(true);
      setEmbedUrl(e.target.value);
    }
  };

  return (
    <Modal isOpen={isEmbedModalOpen} onClose={() => setIsEmbedModalOpen(false)}>
      <Modal.Header>
        <Typography id="dialog1Title" style="h2">
          Embed Video
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2">
        <Input
          error={error ? "Please enter a valid URL format" : null}
          label="Video URL:"
          size="medium"
          type="text"
          value={embedUrl}
          onChange={handleChange}
        />
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button disabled={error} label="Embed" onClick={handleEmbed} />
      </Modal.Footer>
    </Modal>
  );
};

export default EmbedOption;
