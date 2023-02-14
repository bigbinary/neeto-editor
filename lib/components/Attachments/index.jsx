import React, { useRef, useEffect, useState, useImperativeHandle } from "react";

import DropTarget from "@uppy/drop-target";
import classnames from "classnames";
import { Button, Toastr } from "neetoui";
import { isEmpty, isNil } from "ramda";

import { DIRECT_UPLOAD_ENDPOINT } from "common/constants";
import useUppyUploader from "hooks/useUppyUploader";

import Attachment from "./Attachment";
import AttachmentProgress from "./AttachmentProgress";
import { buildUppyConfig, handleDrop, selectFiles } from "./utils";

const Attachments = (
  {
    endpoint = DIRECT_UPLOAD_ENDPOINT,
    attachments = [],
    className = "",
    onChange = _ => {},
    isIndependent = true,
    disabled = false,
    dragDropRef = null,
    config = {},
  },
  ref
) => {
  const [pendingAttachments, setPendingAttachments] = useState([]);

  const attachmentInputRef = useRef(null);

  const { uppy, isUploading } = useUppyUploader({
    endpoint,
    uppyConfig: buildUppyConfig(config),
  });

  const handleAddFile = event => {
    const files = selectFiles({
      previousAttachmentsCount: attachments.length,
      config,
      files: event.target.files,
    });

    files.forEach(file => {
      uppy.addFile({
        name: file.name,
        type: file.type,
        data: file,
      });
    });

    afterAddingFiles();
  };

  const onDrop = () => {
    handleDrop({
      uppy,
      config,
      previousAtachmentsCount: attachments.length,
    });
    afterAddingFiles();
  };

  const afterAddingFiles = () => {
    if (isEmpty(uppy.getFiles())) {
      uppy.reset();

      return;
    }

    const newlyAddedFiles = uppy.getFiles().map(file => ({
      id: file.id,
      filename: file.name,
      signedId: "awaiting",
      url: "",
      progress: 0,
    }));
    setPendingAttachments(prevState => [...prevState, ...newlyAddedFiles]);
    attachmentInputRef.current.value = null;
    handleUpload();
  };

  const handleUpload = async () => {
    try {
      const response = await uppy.upload();

      if (isNil(response)) return;

      const uploadedFiles = response.successful.map(file => ({
        filename: file.name,
        signedId: file.response.signedId,
        url: file.response.blobUrl,
      }));

      setPendingAttachments([]);
      onChange([...attachments, ...uploadedFiles]);
    } catch (error) {
      Toastr.error(error);
    } finally {
      uppy.reset();
    }
  };

  const handleUploadProgress = (file, progress) => {
    setPendingAttachments(prevState =>
      prevState.map(uploadingFile => ({
        ...uploadingFile,
        progress:
          uploadingFile.filename !== file.name
            ? uploadingFile.progress
            : progress.progress,
      }))
    );
  };

  const removeUploadingFile = id => {
    setPendingAttachments(prevState =>
      prevState.filter(uploadingFile => uploadingFile.id !== id)
    );
  };

  const handleUploadAttachments = () => attachmentInputRef.current.click();

  useImperativeHandle(ref, () => ({ handleUploadAttachments }), []);

  useEffect(() => {
    uppy.on("upload-progress", handleUploadProgress);
    if (dragDropRef?.current) {
      uppy.use(DropTarget, {
        target: dragDropRef.current,
        onDrop,
      });
    }

    return () => {
      const instance = uppy.getPlugin("DropTarget");
      if (instance) {
        uppy.removePlugin(instance);
      }
      uppy.off("upload-progress", handleUploadProgress);
    };
  }, [attachments]);

  return (
    <div className={classnames("ne-attachments", { [className]: className })}>
      <div className="ne-attachments__items">
        {attachments.map(attachment => (
          <Attachment
            attachment={attachment}
            attachments={attachments}
            disabled={disabled}
            endpoint={endpoint}
            key={attachment.signedId}
            onChange={onChange}
          />
        ))}
        {pendingAttachments.map(attachment => (
          <AttachmentProgress
            attachment={attachment}
            key={attachment.id}
            removeUploadingFile={removeUploadingFile}
            uppy={uppy}
          />
        ))}
      </div>
      <div>
        {isIndependent && (
          <Button
            disabled={isUploading}
            label="Add attachments"
            loading={isUploading}
            size="medium"
            style="link"
            onClick={handleUploadAttachments}
          />
        )}
        <input
          accept={config.allowedFileTypes?.join(",")}
          multiple={config.maxNumberOfFiles !== 1}
          ref={attachmentInputRef}
          type="file"
          onChange={handleAddFile}
          onClick={event => {
            if (!isEmpty(attachments) && config.maxNumberOfFiles === 1) {
              event.preventDefault();
              Toastr.warning("Only one attachment is allowed");
            }
          }}
        />
      </div>
    </div>
  );
};

export default React.forwardRef(Attachments);
