import React from "react";

import { File, Close } from "neetoicons";
import { Button, Typography } from "neetoui";

const AttachmentProgress = ({ attachment }) => {
  const progressPercentage = `${attachment.progress}%`;

  return (
    <div className="ne-file-attachments__attachments__attachment">
      <div className="ne-file-attachments__attachments__attachment__content">
        <File
          className="ne-file-attachments__attachments__attachment__content__progress__icon"
          size={18}
        />
        <div className="ne-file-attachments__attachments__attachment__content__progress">
          <Typography
            className="ne-file-attachments__attachments__attachment__content__progress__truncate"
            style="body2"
          >
            {attachment.filename}
          </Typography>
          <Typography style="body2">{progressPercentage}</Typography>
        </div>
        <Button
          className="ne-file-attachments__attachments__attachment__content__progress__button"
          icon={Close}
          style="text"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default AttachmentProgress;
