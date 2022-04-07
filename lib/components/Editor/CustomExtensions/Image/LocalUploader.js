import React, { useState } from "react";

import Uppy from "@uppy/core";
import { DragDrop, useUppy } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";

import {
  UPPY_CONFIG,
  UPPY_UPLOAD_CONFIG,
  DEFAULT_UPLOAD_ENDPOINT,
  ALLOWED_FILE_TYPES,
} from "./constants";
import Progress from "./Progress";

const LocalUploader = ({ endpoint = DEFAULT_UPLOAD_ENDPOINT, onSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const uppy = useUppy(() =>
    new Uppy({
      ...UPPY_CONFIG,
      onBeforeFileAdded: (file) => {
        if (file.size > UPPY_CONFIG.restrictions.maxFileSize) {
          setError("File size is too large. Max size is 5MB.");
          return false;
        } else if (!ALLOWED_FILE_TYPES.includes(`.${file.extension}`)) {
          setError(
            `File type is not permitted. Allowed file types are: ${ALLOWED_FILE_TYPES.join(
              ", "
            )}.`
          );
          return false;
        }
        return true;
      },
    })
      .use(XHRUpload, { endpoint, ...UPPY_UPLOAD_CONFIG })
      .on("upload", () => setIsUploading(true))
      .on("upload-success", (_, response) => onSuccess(response.body.imageURL))
      .on("cancel-all", () => setIsUploading(false))
      .on("complete", () => setIsUploading(false))
  );

  return isUploading ? (
    <Progress uppy={uppy} />
  ) : (
    <div>
      <DragDrop
        className="neeto-editor-image-uploader__dnd"
        note="Max. File Size: 5MB"
        locale={{
          strings: {
            dropHereOr: "Drop your file(s) here or %{browse}",
            browse: "Browse",
          },
        }}
        uppy={uppy}
        data-cy="neeto-editor-image-local-uploader"
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default LocalUploader;
