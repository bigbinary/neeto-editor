import i18n from "i18next";
import { Toastr } from "neetoui";
import { mergeRight } from "ramda";

import fileDownloadApi from "apis/file_download";

import { DEFAULT_UPPY_CONFIG } from "./constants";

const { t } = i18n;

export const buildUppyConfig = restrictions =>
  mergeRight(DEFAULT_UPPY_CONFIG, { restrictions });

export const selectFiles = ({ previousAttachmentsCount, config, files }) => {
  const { maxNumberOfFiles } = config;

  if (maxNumberOfFiles) {
    const remainingAttachments = maxNumberOfFiles - previousAttachmentsCount;

    if (remainingAttachments <= 0) {
      Toastr.warning(
        t("attachments.maxNumberOfFiles", { entity: maxNumberOfFiles })
      );

      return [];
    }

    const selectedFiles = Array.from(files).slice(0, remainingAttachments);

    if (selectedFiles.length < files.length) {
      Toastr.warning(
        t("attachments.maxNumberOfFiles", { entity: maxNumberOfFiles })
      );
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
      Toastr.warning(
        t("attachments.maxNumberOfFiles", { entity: maxNumberOfFiles })
      );
      uppy.reset();

      return false;
    }
  }

  return true;
};

export const downloadFile = async (fileUrl, filename) => {
  try {
    const response = await fileDownloadApi.getFile(fileUrl);
    const blob = new Blob([response.data]);
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", filename);

    a.style.display = "none";
    document.body.appendChild(a);

    a.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    Toastr.error(error);
  }
};
