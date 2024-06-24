import React from "react";

import { Close } from "neetoicons";
import { Button, Typography } from "neetoui";
import { FileIcon } from "react-file-icon";

const AttachmentProgress = ({ attachment, uppy, removeUploadingFile }) => {
  const progressPercentage = `${attachment.progress}%`;

  const handleCancel = () => {
    uppy.removeFile(attachment.id);
    removeUploadingFile(attachment.id);
  };

  return (
    <div className="ne-attachments__preview">
      <div className="ne-attachments__preview__progress-icon">
        <FileIcon />
      </div>
      <div className="ne-attachments__preview__progress">
        <Typography style="body2">{attachment.filename}</Typography>
        <Typography style="body2">{progressPercentage}</Typography>
      </div>
      <Button
        data-cy="neeto-editor-preview-upload-cancel-button"
        icon={Close}
        size="small"
        style="text"
        onClick={handleCancel}
      />
    </div>
  );
};

export default AttachmentProgress;
