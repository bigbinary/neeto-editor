import { isNotPresent } from "neetocist";

import useFileUploadStore from "src/stores/useFileUploadStore";
import DirectUpload from "utils/DirectUpload";

const useFileUploader = () => {
  const {
    addFiles: addFilesToStore,
    isUploading,
    getNextQueuedFile,
    updateFileStatus,
    clearQueue,
    setUploading,
    updateFileUploadProgress,
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
      file: file.file,
      url: "http://spinkart.lvh.me:9005/api/direct_uploads",
      progress: xhr => handleUploadProgress(xhr, file),
    });

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

};

export default useFileUploader;
