import React, { useEffect } from "react";

import { removeById } from "neetocommons/pure";
import { Close, Image } from "neetoicons";
import { Button, Typography } from "neetoui";

const Progress = ({ uppy, pendingUploads, setPendingUploads }) => {
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

  const progressPercentage = progress => `${progress}%`;

  return (
    <div className="ne-media-uploader__wrapper">
      {pendingUploads.map(({ id, filename, progress }) => (
        <div className="ne-media-uploader__media" key={id}>
          <Image size={14} />
          <div className="ne-media-uploader__media__progress">
            <Typography style="body2">{filename}</Typography>
            <Typography style="body2">
              {progressPercentage(progress)}
            </Typography>
          </div>
          <Button
            data-cy="neeto-editor-image-upload-cancel-button"
            icon={Close}
            size="small"
            style="text"
            onClick={() => removeUploadingFile(id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Progress;
