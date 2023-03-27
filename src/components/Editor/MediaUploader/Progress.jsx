import React, { useEffect } from "react";

import { removeById } from "neetocommons/pure";
import { Close } from "neetoicons";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

const Progress = ({ uppy, pendingUploads, setPendingUploads }) => {
  const { t } = useTranslation();

  const handleUploadProgress = (file, progress) => {
    setPendingUploads(prevState =>
      prevState.map(uploadingFile => ({
        ...uploadingFile,
        progress:
          uploadingFile.filename !== file.name
            ? uploadingFile.progress
            : progress.progress,
      }))
    );
  };

  const removeUploadingFile = id => {
    uppy.removeFile(id);
    setPendingUploads(prevState => removeById(id, prevState));
  };

  useEffect(() => {
    uppy.on("upload-progress", handleUploadProgress);

    return () => {
      uppy.off("upload-progress", handleUploadProgress);
    };
  }, [uppy]);

  return (
    <div className="ne-media-uploader__wrapper">
      {pendingUploads.map(({ id, filename, progress }) => (
        <div className="ne-media-uploader__media" key={id}>
          <div className="ne-media-uploader__media__info">
            <Typography style="body2">{filename}</Typography>
            <Button
              data-cy="neeto-editor-image-upload-cancel-button"
              icon={Close}
              size="small"
              style="text"
              onClick={() => removeUploadingFile(id)}
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
              {t("local-uploader.completed")}
            </Typography>
          )}
        </div>
      ))}
    </div>
  );
};

export default Progress;
