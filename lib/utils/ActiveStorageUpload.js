import { BasePlugin } from "@uppy/core";

import DirectUpload from "utils/DirectUpload";

class ActiveStorageUpload extends BasePlugin {
  constructor(uppy, opts) {
    super(uppy, opts);

    this.type = "uploader";
    this.id = opts.id || "ActiveStorageUpload";
    this.title = opts.title || "Active Storage Upload";
  }

  install() {
    this.uppy.addUploader(this.upload);
  }

  uninstall() {
    this.uppy.removeUploader(this.upload);
  }

  upload = fileIDs => {
    if (fileIDs.length === 0) return Promise.resolve();

    const promises = fileIDs.map(id => this.uploadFile(this.uppy.getFile(id)));

    return Promise.all(promises);
  };

  uploadFile = async file => {
    const handleProgress = xhr => {
      if (xhr.lengthComputable) {
        this.uppy.emit("upload-progress", file, {
          uploader: this,
          bytesUploaded: xhr.loaded,
          bytesTotal: xhr.total,
        });
      }
    };

    this.uppy.on("file-removed", removedFile => {
      if (removedFile.id === file.id) {
        upload.abort();
      }
    });

    this.uppy.on("upload-cancel", fileID => {
      if (fileID === file.id) {
        upload.abort();
      }
    });

    this.uppy.on("cancel-all", () => upload.abort());

    const upload = new DirectUpload({
      file: file.data,
      url: this.opts.directUploadUrl,
      progress: handleProgress,
    });

    try {
      const blob = await upload.create();
      this.uppy.setFileState(file.id, { response: { status: "success" } });
      this.uppy.emit("upload-success", file, blob);

      return file;
    } catch (error) {
      this.uppy.setFileState(file.id, { response: { status: "error" } });
      this.uppy.emit("upload-error", file, error);
      throw error;
    }
  };
}

export default ActiveStorageUpload;
