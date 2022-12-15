import { useState } from "react";

import Uppy from "@uppy/core";
import { useUppy } from "@uppy/react";

import { convertToFileSize } from "components/Editor/MediaUploader/utils";
import ActiveStorageUpload from "utils/ActiveStorageUpload";

const useUppyUploader = ({
  endpoint,
  uppyConfig,
  uppyUploadConfig,
  onSuccess = () => {},
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
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
        ...uppyUploadConfig,
      })
      .on("upload", () => setIsUploading(true))
      .on("upload-success", (_, { blob_url: blobUrl }) => onSuccess(blobUrl))
      .on("cancel-all", () => setIsUploading(false))
      .on("complete", () => setIsUploading(false))
  );

  return { uppy, isUploading, error };
};

export default useUppyUploader;
