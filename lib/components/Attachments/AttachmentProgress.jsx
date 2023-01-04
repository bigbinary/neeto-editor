import React from "react";

import { File, Close } from "neetoicons";
import { Button, Typography } from "neetoui";

import { noop } from "neetocommons/pure";

const AttachmentProgress = ({ attachment }) => {
  const progressPercentage = `${attachment.progress}%`;

  return (
    <div className="ne-attachments__attachment">
      <File className="ne-attachments__attachment__progress-icon" size={16} />
      <div className="ne-attachments__attachment__progress">
        <Typography style="body2">{attachment.filename}</Typography>
        <Typography style="body2">{progressPercentage}</Typography>
      </div>
      <Button icon={Close} size="small" style="text" onClick={noop} />
    </div>
  );
};

export default AttachmentProgress;
