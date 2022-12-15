const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_FILE_TYPES = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".pdf",
  ".csv",
  ".xlsx",
];

export const DEFAULT_UPPY_CONFIG = {
  autoProceed: false,
  allowMultipleUploads: true,
  restrictions: {
    maxFileSize: MAX_FILE_SIZE,
    allowedFileTypes: ALLOWED_FILE_TYPES,
  },
};

export const UPPY_UPLOAD_CONFIG = { formData: true, fieldName: "blob" };

export const DROP_DOWN_OPTIONS_KEYS = {
  VIEW: "View",
  RENAME: "Rename",
  DELETE: "Delete",
};

export const DROP_DOWN_OPTIONS = [
  {
    key: DROP_DOWN_OPTIONS_KEYS.VIEW,
    label: DROP_DOWN_OPTIONS_KEYS.VIEW,
  },
  {
    key: DROP_DOWN_OPTIONS_KEYS.RENAME,
    label: DROP_DOWN_OPTIONS_KEYS.RENAME,
  },
  {
    key: DROP_DOWN_OPTIONS_KEYS.DELETE,
    label: DROP_DOWN_OPTIONS_KEYS.DELETE,
  },
];

export const KEYS = {
  ENTER: "Enter",
};
