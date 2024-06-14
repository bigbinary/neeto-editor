import { t } from "i18next";
import { isPresent } from "neetocist";
import { Toastr } from "neetoui";

import { convertToFileSize } from "components/Editor/MediaUploader/utils";

export const shouldAddFile = config => file => {
  const { maxFileSize } = config.restrictions;

  if (isPresent(maxFileSize) && file.size > maxFileSize) {
    Toastr.error(
      t("neetoEditor.error.fileIsTooLarge", {
        maxFileSize: convertToFileSize(maxFileSize),
      })
    );

    return false;
  }

  return true;
};

export const selectFiles = ({ previousAttachmentsCount, config, files }) => {
  let addedFilesCount = 0;
  const fallbackMaxNumberOfFiles = previousAttachmentsCount + files.length;
  const { maxNumberOfFiles = fallbackMaxNumberOfFiles } = config.restrictions;
  const canAddFile = shouldAddFile(config);

  const remainingAttachments = maxNumberOfFiles - previousAttachmentsCount;

  if (remainingAttachments <= 0) {
    Toastr.warning(
      t("neetoEditor.attachments.maxNumberOfFiles", {
        entity: maxNumberOfFiles,
      })
    );

    return [];
  }

  const selectedFiles = files.filter(file => {
    const canAdd = canAddFile(file);
    if (canAdd && addedFilesCount + 1 <= remainingAttachments) {
      addedFilesCount += 1;

      return true;
    }

    return false;
  });

  if (selectedFiles.length < files.length) {
    Toastr.warning(
      t("neetoEditor.attachments.maxNumberOfFiles", {
        entity: maxNumberOfFiles,
      })
    );
  }

  return selectedFiles;
};
