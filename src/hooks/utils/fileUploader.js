import { t } from "i18next";
import { Toastr } from "neetoui";

import { convertToFileSize } from "components/Editor/MediaUploader/utils";

export const shouldAddFile = config => file => {
  const { maxFileSize } = config.restrictions;

  if (file.size > maxFileSize) {
    Toastr.error(
      t("neetoEditor.error.fileIsTooLarge", {
        maxFileSize: convertToFileSize(maxFileSize),
      })
    );

    return false;
  }

  return true;
};
