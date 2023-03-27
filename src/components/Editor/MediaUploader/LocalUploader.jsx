import React, { useEffect, useRef, useState } from "react";

import DropTarget from "@uppy/drop-target";
import { Toastr, Typography } from "neetoui";
import { concat, isEmpty, isNil } from "ramda";
import { useTranslation } from "react-i18next";

import useUppyUploader from "hooks/useUppyUploader";

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
  endpoint,
  onClose,
  insertImageToEditor,
  setIsUploading,
}) => {
  const { t } = useTranslation();

  const [pendingUploads, setPendingUploads] = useState([]);

  const fileInputRef = useRef(null);
  const dropTargetRef = useRef(null);

  const uppyConfig = isImage
    ? DEFAULT_IMAGE_UPPY_CONFIG
    : DEFAULT_VIDEO_UPPY_CONFIG;

  const { uppy, isUploading } = useUppyUploader({
    endpoint,
    uppyConfig,
  });

  setIsUploading(isUploading);

  const handleAddFile = ({ target: { files } }) => {
    Array.from(files).forEach(file => {
      try {
        uppy.addFile({
          name: file.name,
          type: file.type,
          data: file,
        });
      } catch (error) {
        if (error.message !== t("error.on-before-file-added-return")) {
          Toastr.error(t("error.cannot-add-files"));
        }
      }
    });

    afterAddingFiles();
  };

  const afterAddingFiles = () => {
    const newlyAddedFiles = uppy.getFiles().map(file => ({
      id: file.id,
      filename: file.name,
      signedId: "awaiting",
      url: "",
      progress: 0,
    }));
    if (isEmpty(newlyAddedFiles)) {
      uppy.reset();

      return;
    }
    setPendingUploads(concat(newlyAddedFiles));
    handleUpload();
  };

  const handleUpload = async () => {
    try {
      const response = await uppy.upload();

      if (isNil(response)) return;
      const uploadedFiles = response.successful.map(file => ({
        filename: file.name,
        signedId: file.response.data?.signed_id || file.response.signed_id,
        url: file.response.data?.blob_url || file.response.blob_url,
      }));

      setPendingUploads([]);
      uploadedFiles.forEach(file => insertImageToEditor(file));
    } catch (error) {
      Toastr.error(error);
    } finally {
      uppy.reset();
      onClose();
    }
  };

  useEffect(() => {
    uppy.use(DropTarget, {
      target: dropTargetRef?.current,
      afterAddingFiles,
    });

    return () => {
      const instance = uppy.getPlugin("DropTarget");
      instance && uppy.removePlugin(instance);
    };
  }, []);

  return !isEmpty(pendingUploads) || isUploading ? (
    <Progress
      pendingUploads={pendingUploads}
      setPendingUploads={setPendingUploads}
      uppy={uppy}
    />
  ) : (
    <div
      className="ne-media-uploader__dnd"
      ref={dropTargetRef}
      onClick={() => fileInputRef.current.click()}
    >
      <input
        multiple
        className="ne-media-uploader__dnd-input"
        ref={fileInputRef}
        type="file"
        accept={
          isImage
            ? ALLOWED_IMAGE_TYPES.join(",")
            : ALLOWED_VIDEO_TYPES.join(",")
        }
        onChange={handleAddFile}
      />
      <Typography style="h5">{t("local-uploader.drop-files-here")}</Typography>
      <Typography style="body3">
        {t("local-uploader.max-file-size", {
          entity: convertToFileSize(uppyConfig.restrictions.maxFileSize),
        })}
      </Typography>
    </div>
  );
};

export default LocalUploader;
