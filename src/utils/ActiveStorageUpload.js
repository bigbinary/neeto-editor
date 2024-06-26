/* eslint-disable @bigbinary/neeto/file-name-and-export-name-standards */
import { BasePlugin } from "@uppy/core";
import { isEmpty } from "ramda";

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
    if (isEmpty(fileIDs)) return Promise.resolve();

    const promises = fileIDs.map(id => this.uploadFile(this.uppy.getFile(id)));

    return Promise.all(promises);
  };

  uploadFile = async file => {
    const handleProgress = xhr => {
      if (xhr.event.lengthComputable) {
        this.uppy.emit("upload-progress", file, {
          uploader: this,
          bytesUploaded: xhr.loaded,
          bytesTotal: xhr.total,
          progress: Math.round((xhr.loaded / xhr.total) * 100),
        });
      }
    };

    this.uppy.on("file-removed", removedFile => {
      if (!(removedFile.id === file.id)) return;
      upload.abort();
      if (isEmpty(this.uppy.getFiles())) {
        this.uppy.emit("complete");
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
      if (!this.uppy.getFile(file.id)) return null;
      this.uppy.setFileState(file.id, { response: { status: "error" } });
      this.uppy.emit("upload-error", file, error);
      throw error;
    }
  };
}

export default ActiveStorageUpload;
