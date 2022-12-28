import React from "react";

import { File } from "neetoicons";
import { Typography } from "neetoui";

const AttachmentProgress = ({ attachment }) => {
  const progressPercentage = `${attachment.progress}%`;

  return (
    <div className="ne-file-attachment-wrapper">
      <div className="ne-file-attachment-inner-wrapper">
        <div>
          <File className="icon-opacity-50" size={25} />
        </div>
        <div className="ne-file-attachment-progress-wrapper">
          <Typography className="truncate-ellipsis-progress">
            {attachment.filename}
          </Typography>
          <Typography>{progressPercentage}</Typography>
        </div>
      </div>
    </div>
  );
};

export default AttachmentProgress;
