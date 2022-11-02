import directUploadsApi from "apis/direct_uploads";
import { noop } from "utils/common";

import { generateChecksum } from "./utils";

class DirectUpload {
  constructor({ url, file, progress = noop }) {
    this.url = url;
    this.file = file;
    this.progress = progress;
    this.abortController = new AbortController();
  }

  create = async () => {
    const { data } = await this.generateUrl();
    const {
      direct_upload: { url, headers },
    } = data;
    await this.uploadToCloud(url, headers);

    return data;
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
