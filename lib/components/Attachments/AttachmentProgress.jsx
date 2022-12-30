import React from "react";

import { File, Close } from "neetoicons";
import { Button, Typography } from "neetoui";

const AttachmentProgress = ({ attachment }) => {
  const progressPercentage = `${attachment.progress}%`;

  return (
    <div className="ne-file-attachment-card-wrapper">
      <div className="ne-file-attachment-inner-wrapper">
        <File className="icon-opacity-50" size={25} />
        <div className="ne-file-attachment-progress-wrapper">
          <Typography className="truncate-ellipsis-progress">
            {attachment.filename}
          </Typography>
          <Typography>{progressPercentage}</Typography>
          <Button icon={Close} style="text" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default AttachmentProgress;
