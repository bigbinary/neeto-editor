import React from "react";

import { File, Close } from "neetoicons";
import { Button, Typography } from "neetoui";

const AttachmentProgress = ({ attachment, uppy, removeUploadingFile }) => {
  const progressPercentage = `${attachment.progress}%`;

  const handleCancel = () => {
    uppy.removeFile(attachment.id);
    removeUploadingFile(attachment.id);
  };

  return (
    <div className="ne-attachments__attachment">
      <File className="ne-attachments__attachment__progress-icon" size={16} />
      <div className="ne-attachments__attachment__progress">
        <Typography style="body2">{attachment.filename}</Typography>
        <Typography style="body2">{progressPercentage}</Typography>
      </div>
      <Button icon={Close} size="small" style="text" onClick={handleCancel} />
    </div>
  );
};

export default AttachmentProgress;
