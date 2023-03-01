import React from "react";

import { DragDrop } from "@uppy/react";

import useUppyUploader from "hooks/useUppyUploader";

import {
  DEFAULT_IMAGE_UPPY_CONFIG,
  DEFAULT_VIDEO_UPPY_CONFIG,
} from "./constants";
import Progress from "./Progress";
import { convertToFileSize } from "./utils";

const LocalUploader = ({ isImage, endpoint, onSuccess }) => {
  const uppyConfig = isImage
    ? DEFAULT_IMAGE_UPPY_CONFIG
    : DEFAULT_VIDEO_UPPY_CONFIG;

  const { uppy, isUploading } = useUppyUploader({
    endpoint,
    uppyConfig,
    onSuccess,
  });

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
    </div>
  );
};

export default LocalUploader;