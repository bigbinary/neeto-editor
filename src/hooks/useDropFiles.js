import { useEffect } from "react";

const useDropFiles = ({ dropTargetRef, attachments = [], onDrop }) => {
  useEffect(() => {
    const dropZone = dropTargetRef?.current;
    let isDragging = false,
      timeout;

    const handleDragOver = event => {
      event.preventDefault();
      event.stopPropagation();
      timeout && clearTimeout(timeout);
      if (!isDragging) {
        isDragging = true;
        dropZone.classList.add("is-dragging-over-files");
      }
    };

    const handleDragLeave = event => {
      event.preventDefault();
      event.stopPropagation();
      if (isDragging) {
        timeout = setTimeout(() => {
          isDragging = false;
          dropZone.classList.remove("is-dragging-over-files");
        }, 0);
      }
    };

    const handleDrop = event => {
      event.preventDefault();
      event.stopPropagation();
      isDragging = false;
      dropZone.classList.remove("is-dragging-over-files");

      const files = Array.from(event.dataTransfer.files);
      onDrop(files);
    };

    if (dropZone) {
      dropZone.addEventListener("dragleave", handleDragLeave);
      dropZone.addEventListener("dragover", handleDragOver);
      dropZone.addEventListener("drop", handleDrop);
    }

    return () => {
      if (!dropZone) return;
      dropZone.removeEventListener("dragover", handleDragOver);
      dropZone.removeEventListener("dragleave", handleDragLeave);
      dropZone.removeEventListener("drop", handleDrop);
    };
  }, [dropTargetRef, attachments]);
};

export default useDropFiles;
