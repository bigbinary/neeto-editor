import React, {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  lazy,
  Suspense,
  useMemo,
} from "react";

import classnames from "classnames";
import { isNotEmpty, isPresent, noop } from "neetocist";
import { Button, Toastr } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

import useFileUploader from "hooks/useFileUploader";

import Attachment from "./Attachment";
import AttachmentProgress from "./AttachmentProgress";
import { stopEvent, buildFileUploadConfig, selectFiles } from "./utils";

const Preview = lazy(() => import("./Preview"));

const Attachments = (
  {
    attachments = [],
    className = "",
    onChange = noop,
    isIndependent = true,
    disabled = false,
    dragDropRef = null,
    config = {},
    setIsUploading = noop,
  },
  ref
) => {
  const { t } = useTranslation();

  const [selectedAttachment, setSelectedAttachment] = useState({});
  const [didFetchPreviewBundle, setDidFetchPreviewBundle] = useState(false);

  const attachmentInputRef = useRef(null);

  const fileUploadConfig = useMemo(
    () => buildFileUploadConfig(config),
    [config]
  );

  const { addFiles, uploadFiles, queuedFiles, cancelUpload, isUploading } =
    useFileUploader({
      config: fileUploadConfig,
      setIsUploadingOnHost: setIsUploading,
    });

  const handleAddFile = async event => {
    const files = selectFiles({
      previousAttachmentsCount: attachments.length,
      config: fileUploadConfig,
      files: event.target.files,
    });

    addFiles(files);
    const uploadedFiles = await uploadFiles();
    isNotEmpty(uploadedFiles) && onChange([...attachments, ...uploadedFiles]);
    attachmentInputRef.current.value = null;
  };

  const handleUploadAttachments = () => attachmentInputRef.current.click();

  const handleFileInputClick = event => {
    if (!(!isEmpty(attachments) && fileUploadConfig.maxNumberOfFiles === 1)) {
      return;
    }
    event.preventDefault();
    Toastr.warning(t("neetoEditor.attachments.oneAttachmentAllowed"));
  };

  useImperativeHandle(ref, () => ({ handleUploadAttachments }), []);

  const uploadDroppedFiles = async event => {
    const files = selectFiles({
      previousAttachmentsCount: attachments.length,
      config: fileUploadConfig,
      files: Array.from(event.dataTransfer.files),
    });
    addFiles(files);
    const uploadedFiles = await uploadFiles();
    isNotEmpty(uploadedFiles) && onChange([...attachments, ...uploadedFiles]);
  };

  useEffect(() => {
    const dropZone = dragDropRef.current;
    let isDragging = false;

    const handleDragOver = event => {
      stopEvent(event);
      if (!isDragging) {
        isDragging = true;
        dropZone.classList.add("uppy-is-drag-over");
      }
    };

    const handleDragLeave = event => {
      stopEvent(event);
      !isDragging && dropZone.classList.remove("uppy-is-drag-over");
    };

    const handleDrop = event => {
      stopEvent(event);
      isDragging = false;
      dropZone.classList.remove("uppy-is-drag-over");

      uploadDroppedFiles(event);
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
  }, [dragDropRef]);

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
            }}
            key={attachment.signedId}
            isLoading={
              !didFetchPreviewBundle &&
              selectedAttachment.url === attachment.url
            }
          />
        ))}
        {queuedFiles.map(attachment => (
          <AttachmentProgress
            {...{ attachment, cancelUpload }}
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
          accept={fileUploadConfig.allowedFileTypes?.join(",")}
          multiple={fileUploadConfig.maxNumberOfFiles !== 1}
          ref={attachmentInputRef}
          type="file"
          onChange={handleAddFile}
          onClick={handleFileInputClick}
        />
        <Suspense fallback={<span />}>
          {isPresent(selectedAttachment) && (
            <Preview
              {...{
                attachments,
                selectedAttachment,
                setDidFetchPreviewBundle,
                setSelectedAttachment,
              }}
              onClose={() => setSelectedAttachment({})}
            />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default React.forwardRef(Attachments);
