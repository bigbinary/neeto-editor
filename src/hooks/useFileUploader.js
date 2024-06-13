import { isNotPresent } from "neetocist";

import useFileUploadStore from "src/stores/useFileUploadStore";
import DirectUpload from "utils/DirectUpload";

import { FILE_UPLOAD_STATUS } from "./constants/fileUploader";
import { shouldAddFile } from "./utils/fileUploader";

let uploadControllers = {};

const useFileUploader = ({ config }) => {
  const {
    addFiles: addFilesToStore,
    isUploading,
    getNextQueuedFile,
    updateFileStatus,
    clearQueue,
    setIsUploading,
    updateFileUploadProgress,
    files,
    removeFile,
  } = useFileUploadStore.pick();

  const handleUploadProgress = (xhr, file) => {
    if (!xhr.event.lengthComputable) return;
    const bytesUploaded = xhr.loaded;
    const bytesTotal = xhr.total;
    const progress = Math.round((bytesUploaded / bytesTotal) * 100);
    updateFileUploadProgress(file.id, progress);
  };

  const uploadFile = async file => {
    const upload = new DirectUpload({
      file: file.data,
      url: config.directUploadEndpoint,
      progress: xhr => handleUploadProgress(xhr, file),
    });

    uploadControllers[file.id] = upload;

    try {
      const { data = {}, ...response } = await upload.create();
      updateFileStatus(file.id, FILE_UPLOAD_STATUS.UPLOADED);

      return {
        id: file.id,
        filename: file.filename,
        signedId: data.signed_id ?? response.signed_id,
        url: data.blob_url ?? response.blob_url,
        contentType: data.content_type ?? response.content_type,
      };
    } catch (error) {
      updateFileStatus(file.id, FILE_UPLOAD_STATUS.ERROR);
      // eslint-disable-next-line no-console
      console.error("Failed to upload attachment", error);
      Toastr.error(t("neetoEditor.error.uploadFileFailed"));
      removeFile(file.id);

      return null;
    }
  };

  const handleUploadFiles = async () => {
    const queuedFile = getNextQueuedFile();

    if (isNotPresent(queuedFile)) {
      setIsUploading(false);

      return [];
    }

    updateFileStatus(queuedFile.id, FILE_UPLOAD_STATUS.UPLOADING);
    const [uploadedFile, remainingUploadedFiles] = await Promise.all([
      uploadFile(queuedFile),
      handleUploadFiles(),
    ]);

    const uploadedFiles = [uploadedFile, ...remainingUploadedFiles];
    const uploadedFileIds = pluck("id", uploadedFiles);
    removeFilesFromQueue(uploadedFileIds);
    uploadControllers = omit(uploadedFileIds, uploadControllers);

    return uploadedFiles.filter(isNot(null));
  };

  const uploadFiles = () => {
    if (isUploading) return [];

    setIsUploading(true);

    return handleUploadFiles();
  };

  const addFiles = files => {
    const filesToAdd = files.filter(shouldAddFile(config)).map(file => ({
      id: hyphenate(`${file.name.toLowerCase()}-${Date.now()}`),
      data: file,
      filename: file.name,
      signedId: "awaiting",
      url: "",
      type: file.type,
      status: FILE_UPLOAD_STATUS.QUEUED,
    }));
    addFilesToStore(filesToAdd);
  };

  const cancelUpload = fileId => {
    uploadControllers[fileId].abort();
    removeFile(fileId);
  };

  return { addFiles, uploadFiles, queuedFiles: files, cancelUpload };
};

export default useFileUploader;
