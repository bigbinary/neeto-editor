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

};

export default useFileUploader;
