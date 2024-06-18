import React from "react";

import { withT } from "neetocommons/react-utils";
import { Close } from "neetoicons";
import { Button, Typography } from "neetoui";

const Progress = withT(({ t, queuedFiles, cancelUpload }) => (
  <div className="ne-media-uploader__wrapper">
    {queuedFiles.map(({ id, filename, progress }) => (
      <div className="ne-media-uploader__media" key={id}>
        <div className="ne-media-uploader__media__info">
          <Typography style="body2">{filename}</Typography>
          <Button
            data-cy="neeto-editor-image-upload-cancel-button"
            icon={Close}
            size="small"
            style="text"
            onClick={() => cancelUpload(id)}
          />
        </div>
        {progress !== 100 ? (
          <div className="ne-media-uploader__media__progress">
            <div
              className="ne-media-uploader__media__progress-bar"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        ) : (
          <Typography style="body3">
            {t("neetoEditor.localUploader.completed")}
          </Typography>
        )}
      </div>
    ))}
  </div>
));

export default Progress;
