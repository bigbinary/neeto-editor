import React, { useState } from "react";

import Uppy from "@uppy/core";
import { DragDrop, useUppy } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";

import Progress from "./Progress";

const DEFAULT_ENDPOINT = "/api/v1/direct_uploads/image_upload";

const UPPY_CONFIG = {
  allowMultipleUploads: false,
  autoProceed: true,
  restrictions: {
    allowedFileTypes: [".jpg", ".jpeg", ".png", ".gif"],
  },
};

const UPPY_UPLOAD_CONFIG = { formData: true, fieldName: "blob" };

const LocalUploader = ({ endpoint = DEFAULT_ENDPOINT, onSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);

  const uppy = useUppy(() =>
    new Uppy(UPPY_CONFIG)
      .use(XHRUpload, { endpoint, ...UPPY_UPLOAD_CONFIG })
      .on("upload", () => setIsUploading(true))
      .on("upload-success", (_, response) => onSuccess(response.body.imageURL))
      .on("cancel-all", () => setIsUploading(false))
      .on("complete", () => setIsUploading(false))
  );

  return isUploading ? (
    <Progress uppy={uppy} />
  ) : (
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
  );
};

export default LocalUploader;
