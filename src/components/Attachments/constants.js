import { globalProps } from "neetocommons/initializers";

import { DIRECT_UPLOAD_ENDPOINT } from "src/common/constants";

export const DEFAULT_FILE_UPLOAD_CONFIG = {
  autoProceed: false,
  allowMultipleUploads: false,
  directUploadEndpoint: DIRECT_UPLOAD_ENDPOINT,
  restrictions: {
    maxFileSize:
      (globalProps?.endUserUploadedFileSizeLimitInMb ?? 2) * 1024 * 1024,
  },
};

export const ATTACHMENT_OPTIONS = {
  DOWNLOAD: "Download",
  RENAME: "Rename",
  DELETE: "Delete",
};

export const ATTACHMENTS_PREVIEW_DATA_CY = "ne-attachments-preview-content";
