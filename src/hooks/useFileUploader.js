const useFileUploader = () => {
  const {
    addFiles,
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

  const uploadFiles = async () => {
    if (isUploading) return [];

    const handleUploadFiles = async () => {
      const queuedFile = getNextQueuedFile();

      if (isNotPresent(queuedFile)) {
        setUploading(false);

        return [];
      }

      setUploading(true);
      // eslint-disable-next-line @bigbinary/neeto/combine-multiple-independent-awaits
      const uploadedFile = await uploadFile(queuedFile);

      const remainingUploadedFiles = await handleUploadFiles();

      clearQueue();

      return [uploadedFile, ...remainingUploadedFiles];
    };

    return handleUploadFiles();
  };

  return { addFiles, uploadFiles };
};

export default useFileUploader;
