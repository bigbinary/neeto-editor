import i18n from "i18next";
import { noop } from "neetocommons/pure";
import { Toastr } from "neetoui";

import directUploadsApi from "apis/direct_uploads";

import { generateChecksum } from "./utils";

const { t } = i18n;

class DirectUpload {
  constructor({ url, file, progress = noop }) {
    this.url = url;
    this.file = file;
    this.progress = progress;
    this.abortController = new AbortController();
  }

  create = async () => {
    const response = await this.generateUrl();
    try {
      const { url, headers } =
        response.direct_upload || response.data.direct_upload;
      await this.uploadToCloud(url, headers);

      return response;
    } catch (error) {
      error.name === t("error.cancel")
        ? Toastr.error(t("error.cancelled"))
        : Toastr.error(error.message);
    }

    return response;
  };

  generateUrl = async () => {
    const payload = {
      blob: {
        filename: this.file.name,
        byte_size: this.file.size,
        content_type: this.file.type,
        checksum: await generateChecksum(this.file),
      },
    };

    return directUploadsApi.generate(this.url, payload);
  };

  abort = () => this.abortController.abort();

  uploadToCloud = (url, headers) => {
    const config = {
      headers,
      onUploadProgress: this.progress,
      signal: this.abortController.signal,
    };

    return directUploadsApi.create(url, this.file, config);
  };
}

export default DirectUpload;
