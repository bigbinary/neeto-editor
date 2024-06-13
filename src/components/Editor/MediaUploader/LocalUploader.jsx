import React, { useEffect, useMemo, useRef } from "react";

import { ImageUpload } from "neetoicons";
import { Typography } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import useFileUploader from "hooks/useFileUploader";

import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  DEFAULT_IMAGE_UPPY_CONFIG,
  DEFAULT_VIDEO_UPPY_CONFIG,
} from "./constants";
import Progress from "./Progress";
import { convertToFileSize } from "./utils";

const LocalUploader = ({
  isImage,
  onClose,
  insertMediaToEditor,
  setIsUploading,
}) => {
  const { t } = useTranslation();

  const uploadConfig = useMemo(
    () => (isImage ? DEFAULT_IMAGE_UPPY_CONFIG : DEFAULT_VIDEO_UPPY_CONFIG),
    []
  );

  const fileInputRef = useRef(null);
  const dropTargetRef = useRef(null);

  const { addFiles, uploadFiles, queuedFiles, cancelUpload, isUploading } =
    useFileUploader({
      config: uploadConfig,
      setIsUploadingOnHost: setIsUploading,
    });

  setIsUploading(isUploading);

  const handleAddFile = async ({ target: { files } }) => {
    addFiles(Array.from(files));
    const uploadedFiles = await uploadFiles();
    uploadedFiles.forEach(insertMediaToEditor);
    onClose();
  };

  useEffect(() => {
    const dropZone = dropTargetRef?.current;
    let isDragging = false;

    const handleDragOver = event => {
      event.preventDefault();
      event.stopPropagation();
      if (!isDragging) {
        isDragging = true;
        dropZone.classList.add("uppy-is-drag-over");
      }
    };

    const handleDragLeave = event => {
      event.preventDefault();
      event.stopPropagation();
      if (!isDragging) {
        dropZone.classList.remove("uppy-is-drag-over");
      }
    };

    const handleDrop = async event => {
      event.preventDefault();
      event.stopPropagation();
      isDragging = false;
      dropZone.classList.remove("uppy-is-drag-over");

      const files = Array.from(event.dataTransfer.files);
      addFiles(files);
      const uploadedFiles = await uploadFiles();
      uploadedFiles.forEach(insertMediaToEditor);
      onClose();
    };

    if (dropZone) {
      dropZone.addEventListener("dragover", handleDragOver);
      dropZone.addEventListener("dragleave", handleDragLeave);
      dropZone.addEventListener("drop", handleDrop);
    }

    return () => {
      if (!dropZone) return;
      dropZone.removeEventListener("dragover", handleDragOver);
      dropZone.removeEventListener("dragleave", handleDragLeave);
      dropZone.removeEventListener("drop", handleDrop);
    };
  }, [dropTargetRef]);

  return !isEmpty(queuedFiles) || isUploading ? (
    <Progress {...{ cancelUpload, queuedFiles }} />
  ) : (
    <div
      className="ne-media-uploader__dnd"
      data-cy="neeto-editor-media-uploader-dnd"
      ref={dropTargetRef}
      tabIndex={0}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        multiple
        className="ne-media-uploader__dnd-input"
        data-cy="neeto-editor-media-uploader-input"
        ref={fileInputRef}
        type="file"
        accept={
          isImage
            ? ALLOWED_IMAGE_TYPES.join(",")
            : ALLOWED_VIDEO_TYPES.join(",")
        }
        onChange={handleAddFile}
      />
      <ImageUpload className="ne-media-uploader__dnd-icon" size={24} />
      <Typography style="body2">
        {t("neetoEditor.localUploader.dropFilesHere")}
      </Typography>
      <Typography style="body3">
        {t("neetoEditor.localUploader.maxFileSize", {
          entity: convertToFileSize(uploadConfig.restrictions.maxFileSize),
        })}
      </Typography>
    </div>
  );
};

export default LocalUploader;
