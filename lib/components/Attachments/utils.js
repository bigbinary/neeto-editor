import { Toastr } from "neetoui";
import { mergeRight } from "ramda";

import { DEFAULT_UPPY_CONFIG } from "./constants";

export const buildUppyConfig = restrictions =>
  mergeRight(DEFAULT_UPPY_CONFIG, { restrictions });

export const selectFiles = ({ previousAttachmentsCount, config, files }) => {
  if (config.maxNumberOfFiles) {
    const upperLimit = config.maxNumberOfFiles - previousAttachmentsCount;
    if (upperLimit <= 0) {
      Toastr.warning("You can't add more files");

      return [];
    }
    const filesArray = Array.from(files);
    if (
      filesArray.length + previousAttachmentsCount >
      config.maxNumberOfFiles
    ) {
      Toastr.warning(`You can only attach ${upperLimit} files`);
    }

    return filesArray.slice(0, upperLimit);
  }

  return Array.from(files);
};

export const handleDrop = ({ uppy, config, previousAtachmentsCount }) => {
  const { maxNumberOfFiles } = config;
  if (maxNumberOfFiles) {
    const files = uppy.getFiles();
    if (files.length + previousAtachmentsCount > maxNumberOfFiles) {
      Toastr.warning(`You can only attach ${maxNumberOfFiles} files`);
      uppy.reset();
    }
  }

  return true;
};
