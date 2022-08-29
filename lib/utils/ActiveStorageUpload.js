import { DirectUpload } from "@rails/activestorage";
import { BasePlugin } from "@uppy/core";
import { mergeRight } from "ramda";

class ActiveStorageUpload extends BasePlugin {
  constructor(uppy, opts) {
    super(uppy, opts);

    this.type = "uploader";
    this.id = opts.id || "ActiveStorageUpload";
    this.title = opts.title || "Active Storage Upload";
    this.token = opts.token || "";
    this.attachmentName = opts.attachmentName || "";

    const defaultOptions = {
      timeout: 30 * 1000,
      limit: 0,
      directUploadUrl: this.opts.directUploadUrl,
    };

    this.opts = mergeRight(defaultOptions, opts);
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

  uploadFile = file =>
    new Promise((resolve, reject) => {
      const timer = this.createProgressTimeout(this.opts.timeout, error => {
        this.uppy.emit("upload-error", file, error);
        reject(error);
      });

      const directHandlers = {
        directUploadWillStoreFileWithXHR: null,
        directUploadDidProgress: null,
      };

      directHandlers.directUploadDidProgress = xhr => {
        timer.progress();

        if (xhr.lengthComputable) {
          this.uppy.emit("upload-progress", file, {
            uploader: this,
            bytesUploaded: xhr.loaded,
            bytesTotal: xhr.total,
          });
        }
      };

      directHandlers.directUploadWillStoreFileWithXHR = request => {
        request.upload.addEventListener("progress", event =>
          directHandlers.directUploadDidProgress(event)
        );
      };

      const { data, meta } = file;

      if (!data.name && meta.name) {
        data.name = meta.name;
      }

      const upload = new DirectUpload(
        data,
        this.opts.directUploadUrl,
        this.opts.token,
        this.opts.attachmentName,
        directHandlers
      );

      upload.create((error, blob) => {
        timer.done();

        if (error) {
          const response = { status: "error" };
          this.uppy.setFileState(file.id, { response });
          this.uppy.emit("upload-error", file, error);
          return reject(error);
        }
        const response = {
          status: "success",
          directUploadSignedId: blob.signed_id,
        };
        this.uppy.setFileState(file.id, { response });
        this.uppy.emit("upload-success", file, blob);
        return resolve(file);
      });

      this.uppy.on("file-removed", removedFile => {
        if (removedFile.id === file.id) {
          timer.done();
          upload.abort?.();
        }
      });

      this.uppy.on("upload-cancel", fileID => {
        if (fileID === file.id) {
          timer.done();
          upload.abort?.();
        }
      });

      this.uppy.on("cancel-all", () => {
        timer.done();
        upload.abort?.();
      });
    });

  // Helper to abort the request if it exceeds `duration` milli seconds.
  createProgressTimeout(duration, errorCallback) {
    let timer = null;
    let isDone = false;

    const progress = () => {
      if (isDone) return;

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => errorCallback("Request timed out."), duration);
    };

    const done = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      isDone = true;
    };

    return { progress, done };
  }
}

export default ActiveStorageUpload;
