import React, { useState } from "react";

import Uppy from "@uppy/core";
import { DragDrop, useUppy } from "@uppy/react";

import ActiveStorageUpload from "utils/ActiveStorageUpload";

import {
  DEFAULT_IMAGE_UPPY_CONFIG,
  DEFAULT_VIDEO_UPPY_CONFIG,
  UPPY_UPLOAD_CONFIG,
} from "./constants";
import Progress from "./Progress";
import { convertToFileSize } from "./utils";

const LocalUploader = ({ isImage, endpoint, onSuccess, uploadConfig }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const defaultUppyConfig = isImage
    ? DEFAULT_IMAGE_UPPY_CONFIG
    : DEFAULT_VIDEO_UPPY_CONFIG;
  const uppyConfig = { ...defaultUppyConfig, ...uploadConfig };

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
      .on("upload-success", (_, { blob_url: blobUrl }) => onSuccess(blobUrl))
      .on("cancel-all", () => setIsUploading(false))
      .on("complete", () => setIsUploading(false))
  );

  return isUploading ? (
    <Progress uppy={uppy} />
  ) : (
    <div className="ne-media-uploader__dnd-wrapper">
      <DragDrop
        className="ne-media-uploader__dnd"
        data-cy="neeto-editor-media-local-uploader"
        uppy={uppy}
        locale={{
          strings: {
            dropHereOr: "Drop your file(s) here or %{browse}",
            browse: "Browse",
          },
        }}
        note={`Max. File Size: ${convertToFileSize(
          uppyConfig.restrictions.maxFileSize
        )}`}
      />
      {error && <p className="ne-media-uploader__dnd--error">{error}</p>}
    </div>
  );
};

export default LocalUploader;
