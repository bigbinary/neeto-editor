import React, { useState, useEffect } from "react";

import { Close } from "neetoicons";

import Button from "components/Common/Button";

const Progress = ({ uppy }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    uppy.on("progress", setProgress);
  }, [uppy]);

  const progressPercentage = `${progress}%`;

  return (
    <div className="neeto-editor-image-uploader__progress">
      <p className="neeto-editor-image-uploader__progress-title">
        Uploading...
      </p>
      <p className="neeto-editor-image-uploader__progress-file">
        {uppy.getFiles()[0]?.name}
      </p>
      <div
        className="neeto-editor-progress-bar__wrapper"
        data-cy="neeto-editor-image-upload-progress-bar"
      >
        <div className="neeto-editor-progress-bar__percent">
          <p>{progressPercentage}</p>
          <Button
            icon={Close}
            size="small"
            style="text"
            onClick={() => uppy.cancelAll()}
          />
        </div>
        <div className="neeto-editor-progress-bar__indicator">
          <div
            className="neeto-editor-progress-bar__indicator-inner"
            style={{ width: progressPercentage }}
          />
        </div>
      </div>
    </div>
  );
};

export default Progress;
