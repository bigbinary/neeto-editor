import React, { useRef, useEffect, useState, useImperativeHandle } from "react";

import DropTarget from "@uppy/drop-target";
import classnames from "classnames";
import { removeById, noop } from "neetocist";
import { Button, Toastr } from "neetoui";
import { concat, isEmpty, isNil } from "ramda";
import { useTranslation } from "react-i18next";

import useUppyUploader from "hooks/useUppyUploader";

import Attachment from "./Attachment";
import AttachmentProgress from "./AttachmentProgress";
import Preview from "./Preview";
import { buildUppyConfig, handleDrop, selectFiles } from "./utils";

const Attachments = (
  {
    attachments = [],
    className = "",
    onChange = noop,
    isIndependent = true,
    disabled = false,
    dragDropRef = null,
    config = {},
    showToastr = true,
    setIsUploading = noop,
  },
  ref
) => {
  const { t } = useTranslation();

  const [pendingAttachments, setPendingAttachments] = useState([]);
  const [selectedAttachment, setSelectedAttachment] = useState({});

  const attachmentInputRef = useRef(null);

  const { uppy, isUploading } = useUppyUploader({
    uppyConfig: buildUppyConfig(config),
  });

  const handleAddFile = event => {
    const files = selectFiles({
      previousAttachmentsCount: attachments.length,
      config,
      files: event.target.files,
    });

    files.forEach(file => {
      try {
        uppy.addFile({
          name: file.name,
          type: file.type,
          data: file,
        });
      } catch (error) {
        if (error.message !== t("neetoEditor.error.onBeforeFileAddedReturn")) {
          Toastr.error(t("neetoEditor.error.cannotAddFiles"));
        }
      }
    });

    afterAddingFiles();
  };

  const onDrop = () => {
    handleDrop({
      uppy,
      config,
      previousAttachmentsCount: attachments.length,
    }) && afterAddingFiles();
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
    setPendingAttachments(concat(newlyAddedFiles));
    attachmentInputRef.current.value = null;
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
        contentType:
          file.response.data?.content_type || file.response.content_type,
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
    setPendingAttachments(prevState => removeById(id, prevState));
  };

  const handleUploadAttachments = () => attachmentInputRef.current.click();

  const handleFileInputClick = event => {
    if (!(!isEmpty(attachments) && config.maxNumberOfFiles === 1)) {
      return;
    }
    event.preventDefault();
    Toastr.warning(t("neetoEditor.attachments.oneAttachmentAllowed"));
  };

  useImperativeHandle(ref, () => ({ handleUploadAttachments }), []);

  useEffect(() => {
    setIsUploading(isUploading);
  }, [isUploading]);

  useEffect(() => {
    uppy.on("upload-progress", handleUploadProgress);
    if (dragDropRef?.current) {
      uppy.use(DropTarget, { target: dragDropRef.current, onDrop });
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
            {...{
              attachment,
              attachments,
              disabled,
              onChange,
              setSelectedAttachment,
              showToastr,
            }}
            key={attachment.signedId}
          />
        ))}
        {pendingAttachments.map(attachment => (
          <AttachmentProgress
            {...{ attachment, removeUploadingFile, uppy }}
            key={attachment.id}
          />
        ))}
      </div>
      <div>
        {isIndependent && (
          <Button
            data-cy="neeto-editor-attachments-upload-button"
            disabled={isUploading}
            label={t("neetoEditor.attachments.add")}
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
          onClick={handleFileInputClick}
        />
        <Preview
          {...{ attachments, selectedAttachment, setSelectedAttachment }}
          onClose={() => setSelectedAttachment({})}
        />
      </div>
    </div>
  );
};

export default React.forwardRef(Attachments);
