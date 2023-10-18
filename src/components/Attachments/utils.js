import i18n from "i18next";
import { Toastr } from "neetoui";
import { mergeRight } from "ramda";

import fileDownloadApi from "apis/file_download";

import { DEFAULT_UPPY_CONFIG } from "./constants";

const { t } = i18n;

const parseUserAgent = userAgent => {
  const browsers = {
    Chrome: /Chrome/i,
    Firefox: /Firefox/i,
    Safari: /Safari/i,
    Edge: /Edg/i,
    IE: /MSIE|Trident/i,
  };

  for (const browser in browsers) {
    if (browsers[browser].test(userAgent)) {
      const version = userAgent.match(new RegExp(`${browser}/[0-9.]+`, "i"));

      return {
        name: browser,
        version: version ? version[0].split("/")[1] : "Unknown",
      };
    }
  }

  return { name: "Unknown", version: "Unknown" };
};

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

export const getBrowserDetails = () => {
  const userAgent = navigator.userAgent;

  return parseUserAgent(userAgent);
};

export const checkPreviewAvailability = contentType =>
  contentType.startsWith("image/") ||
  contentType.startsWith("video/") ||
  (contentType === "application/pdf" && getBrowserDetails()?.name === "Chrome");
