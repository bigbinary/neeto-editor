import { isNotPresent } from "neetocist";

import useFileUploadStore from "src/stores/useFileUploadStore";
import DirectUpload from "utils/DirectUpload";

let uploadControllers = {};

const useFileUploader = () => {
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
      url: "http://spinkart.lvh.me:9005/api/direct_uploads",
      progress: xhr => handleUploadProgress(xhr, file),
    });

    uploadControllers[file.id] = upload;

    try {
      const blob = await upload.create();
      await updateFileStatus(file.id, "uploaded");

      return file;
    } catch {
      await updateFileStatus(file.id, "uploaded-error");
    }
  };

  const handleUploadFiles = async () => {
    const queuedFile = getNextQueuedFile();

    if (isNotPresent(queuedFile)) {
      setIsUploading(false);

      return [];
    }

    updateFileStatus(queuedFile.id, "uploading");
    const [uploadedFile, remainingUploadedFiles] = await Promise.all([
      uploadFile(queuedFile),
      handleUploadFiles(),
    ]);
    clearQueue();
    uploadControllers = {};

    return [uploadedFile, ...remainingUploadedFiles];
  };

  const uploadFiles = () => {
    if (isUploading) return [];

    setIsUploading(true);

    return handleUploadFiles();
  };

  const addFiles = files => {
    const filesToAdd = files.map(file => ({
      id: `${file.name}-${file.size}-${Date.now()}`, // To refactor before the final PR.
      data: file,
      filename: file.name,
      signedId: "awaiting",
      url: "",
      type: file.type,
      status: "queued", // To refactor before the final PR.
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
