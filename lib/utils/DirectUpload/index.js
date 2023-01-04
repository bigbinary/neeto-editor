import directUploadsApi from "apis/direct_uploads";
import { noop } from "neetocommons/pure";

import { generateChecksum } from "./utils";

class DirectUpload {
  constructor({ url, file, progress = noop }) {
    this.url = url;
    this.file = file;
    this.progress = progress;
    this.abortController = new AbortController();
  }

  create = async () => {
    const response = await this.generateUrl();
    const { url, headers } = response.directUpload;
    await this.uploadToCloud(url, headers);

    return response;
  };

  generateUrl = async () => {
    const payload = {
      blob: {
        filename: this.file.name,
        byteSize: this.file.size,
        contentType: this.file.type,
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
