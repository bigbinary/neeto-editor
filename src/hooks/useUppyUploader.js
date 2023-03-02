import { useState } from "react";

import Uppy from "@uppy/core";
import { useUppy } from "@uppy/react";
import { noop } from "neetocommons/pure";
import { Toastr } from "neetoui";

import { UPPY_UPLOAD_CONFIG } from "components/Editor/MediaUploader/constants";
import { convertToFileSize } from "components/Editor/MediaUploader/utils";
import ActiveStorageUpload from "utils/ActiveStorageUpload";

const useUppyUploader = ({ endpoint, uppyConfig, onSuccess = noop }) => {
  const [isUploading, setIsUploading] = useState(false);

  const onBeforeFileAdded = file => {
    const { maxFileSize } = uppyConfig.restrictions;

    if (file.size > maxFileSize) {
      Toastr.error(
        `File size is too large. Max size is  ${convertToFileSize(
          uppyConfig.restrictions.maxFileSize
        )}.`
      );

      return false;
    }

    return true;
  };

  const uppy = useUppy(() =>
    new Uppy({
      ...uppyConfig,
      onBeforeFileAdded,
    })
      .use(ActiveStorageUpload, {
        directUploadUrl: endpoint,
        ...UPPY_UPLOAD_CONFIG,
      })
      .on("upload", () => setIsUploading(true))
      .on("upload-success", (_, res) => {
        const blobUrl = res.data?.blob_url || res.blob_url;
        onSuccess?.(blobUrl);
      })
      .on("cancel-all", () => setIsUploading(false))
      .on("complete", () => {
        uppy.reset();
        setIsUploading(false);
      })
  );

  return { uppy, isUploading };
};

export default useUppyUploader;
