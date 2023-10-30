import { globalProps } from "neetocommons/initializers";

export const DEFAULT_UPPY_CONFIG = {
  autoProceed: false,
  allowMultipleUploads: false,
  restrictions: {
    maxFileSize: globalProps.endUserUploadedFileSizeLimitInMb * 1024 * 1024,
  },
};

export const ATTACHMENT_OPTIONS = {
  DOWNLOAD: "Download",
  RENAME: "Rename",
  DELETE: "Delete",
};
