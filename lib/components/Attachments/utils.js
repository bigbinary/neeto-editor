import { Toastr } from "neetoui";
import { mergeRight } from "ramda";

import { DEFAULT_UPPY_CONFIG } from "./constants";

export const buildUppyConfig = restrictions =>
  mergeRight(DEFAULT_UPPY_CONFIG, { restrictions });

export const selectFiles = ({ previousAttachmentsCount, config, files }) => {
  const { maxNumberOfFiles } = config;

  if (maxNumberOfFiles) {
    const remainingAttachments = maxNumberOfFiles - previousAttachmentsCount;

    if (remainingAttachments <= 0) {
      Toastr.warning("You can't add more files");

      return [];
    }

    const selectedFiles = Array.from(files).slice(0, remainingAttachments);

    if (selectedFiles.length < files.length) {
      Toastr.warning(`You can only attach ${maxNumberOfFiles} files`);
    }

    return selectedFiles;
  }

  return Array.from(files);
};

export const handleDrop = ({ uppy, config, previousAttachmentsCount }) => {
  const { maxNumberOfFiles } = config;

  if (maxNumberOfFiles) {
    const files = uppy.getFiles();
    const totalAttachments = files.length + previousAttachmentsCount;

    if (totalAttachments > maxNumberOfFiles) {
      Toastr.warning(`You can only attach ${maxNumberOfFiles} files`);
      uppy.reset();

      return false;
    }
  }

  return true;
};
