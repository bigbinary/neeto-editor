import React, { useState } from "react";

import Uppy from "@uppy/core";
import { DragDrop, useUppy } from "@uppy/react";
import ActiveStorageUpload from "utils/ActiveStorageUpload";

import { DEFAULT_UPPY_CONFIG, UPPY_UPLOAD_CONFIG } from "./constants";
import Progress from "./Progress";
import { convertToFileSize } from "./utils";

const LocalUploader = ({ endpoint, onSuccess, uploadConfig }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const uppyConfig = { ...DEFAULT_UPPY_CONFIG, ...uploadConfig };

  const uppy = useUppy(() =>
    new Uppy({
      ...uppyConfig,
      onBeforeFileAdded: file => {
        const { maxFileSize, allowedFileTypes } = uppyConfig.restrictions;

        if (file.size > maxFileSize) {
          setError(
            `File size is too large. Max size is  ${convertToFileSize(
              uppyConfig.restrictions.maxFileSize
            )}.`
          );
          return false;
        } else if (!allowedFileTypes.includes(`.${file.extension}`)) {
          setError(
            `File type is not permitted. Allowed file types are: ${allowedFileTypes.join(
              ", "
            )}.`
          );
          return false;
        }

        return true;
      },
    })
      .use(ActiveStorageUpload, {
        directUploadUrl: endpoint,
        ...UPPY_UPLOAD_CONFIG,
      })
      .on("upload", () => setIsUploading(true))
      .on("upload-success", (_, { blob_url: imageUrl }) => onSuccess(imageUrl))
      .on("cancel-all", () => setIsUploading(false))
      .on("complete", () => setIsUploading(false))
  );

  return isUploading ? (
    <Progress uppy={uppy} />
  ) : (
    <div className="neeto-editor-image-uploader__dnd-wrapper">
      <DragDrop
        className="neeto-editor-image-uploader__dnd"
        note={`Max. File Size: ${convertToFileSize(
          uppyConfig.restrictions.maxFileSize
        )}`}
        locale={{
          strings: {
            dropHereOr: "Drop your file(s) here or %{browse}",
            browse: "Browse",
          },
        }}
        uppy={uppy}
        data-cy="neeto-editor-image-local-uploader"
      />
      {error && (
        <p className="neeto-editor-image-uploader__dnd--error">{error}</p>
      )}
    </div>
  );
};

export default LocalUploader;
