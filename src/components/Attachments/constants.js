const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

export const DEFAULT_UPPY_CONFIG = {
  autoProceed: false,
  allowMultipleUploads: false,
  restrictions: {
    maxFileSize: MAX_FILE_SIZE,
  },
};

export const UPPY_UPLOAD_CONFIG = { formData: true, fieldName: "blob" };

export const ATTACHMENT_OPTIONS = {
  DOWNLOAD: "Download",
  RENAME: "Rename",
  DELETE: "Delete",
};
