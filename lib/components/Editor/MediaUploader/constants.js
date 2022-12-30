const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB

const ALLOWED_IMAGE_TYPES = [".jpg", ".jpeg", ".png", ".gif"];
const ALLOWED_VIDEO_TYPES = [".mp4", ".mov", ".avi", ".mkv"];

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

export const DEFAULT_IMAGE_UPPY_CONFIG = {
  autoProceed: true,
  allowMultipleUploads: false,
  restrictions: {
    maxFileSize: MAX_IMAGE_SIZE,
    allowedFileTypes: ALLOWED_IMAGE_TYPES,
  },
};

export const DEFAULT_VIDEO_UPPY_CONFIG = {
  autoProceed: true,
  allowMultipleUploads: false,
  restrictions: {
    maxFileSize: MAX_VIDEO_SIZE,
    allowedFileTypes: ALLOWED_VIDEO_TYPES,
  },
};

export const UPPY_UPLOAD_CONFIG = { formData: true, fieldName: "blob" };

export const MEDIA_UPLOAD_OPTIONS = [
  { title: "Upload", key: "local" },
  { title: "Link", key: "link" },
  { title: "Unsplash", key: "unsplash" },
];
