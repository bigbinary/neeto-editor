import i18n from "i18next";
import { Toastr } from "neetoui";
import { mergeRight } from "ramda";

import fileDownloadApi from "apis/file_download";

import { DEFAULT_FILE_UPLOAD_CONFIG } from "./constants";

const { t } = i18n;

export const buildFileUploadConfig = config =>
  mergeRight(DEFAULT_FILE_UPLOAD_CONFIG, config);

export const selectFiles = ({ previousAttachmentsCount, config, files }) => {
  const { maxNumberOfFiles } = config;

  if (maxNumberOfFiles) {
    const remainingAttachments = maxNumberOfFiles - previousAttachmentsCount;

    if (remainingAttachments <= 0) {
      Toastr.warning(
        t("neetoEditor.attachments.maxNumberOfFiles", {
          entity: maxNumberOfFiles,
        })
      );

      return [];
    }

    const selectedFiles = Array.from(files).slice(0, remainingAttachments);

    if (selectedFiles.length < files.length) {
      Toastr.warning(
        t("neetoEditor.attachments.maxNumberOfFiles", {
          entity: maxNumberOfFiles,
        })
      );
    }

    return selectedFiles;
  }

  return Array.from(files);
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

export const checkPreviewAvailability = contentType =>
  contentType &&
  (contentType.startsWith("video/") ||
    contentType === "application/pdf" ||
    contentType === "image/jpeg" ||
    contentType === "image/gif" ||
    contentType === "image/png" ||
    contentType === "image/webp" ||
    contentType === "text/plain" ||
    contentType === "image/bmp" ||
    contentType === "application/msword" ||
    contentType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    contentType === "text/htm" ||
    contentType === "text/html" ||
    contentType === "image/jpg" ||
    contentType === "application/vnd.ms-powerpoint" ||
    contentType ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    contentType === "image/tiff" ||
    contentType === "application/vnd.ms-excel" ||
    contentType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

export const stopEvent = event => {
  event.preventDefault();
  event.stopPropagation();
};
