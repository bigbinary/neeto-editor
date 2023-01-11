import React, { useRef, useEffect, useState, useImperativeHandle } from "react";

import classnames from "classnames";
import { Button, Toastr } from "neetoui";
import { isNil } from "ramda";

import { DIRECT_UPLOAD_ENDPOINT } from "common/constants";
import useUppyUploader from "hooks/useUppyUploader";

import Attachment from "./Attachment";
import AttachmentProgress from "./AttachmentProgress";
import { DEFAULT_UPPY_CONFIG } from "./constants";

const Attachments = (
  {
    endpoint = DIRECT_UPLOAD_ENDPOINT,
    attachments = [],
    className = "",
    onChange = _ => {},
    isIndependent = true,
  },
  ref
) => {
  const [pendingAttachments, setPendingAttachments] = useState([]);

  const attachmentInputRef = useRef(null);

  const { uppy, isUploading } = useUppyUploader({
    endpoint,
    uppyConfig: DEFAULT_UPPY_CONFIG,
  });

  const handleAddFile = event => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      uppy.addFile({
        name: file.name,
        type: file.type,
        data: file,
      });
    });

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

    return () => {
      uppy.off("upload-progress", handleUploadProgress);
    };
  }, []);

  return (
    <div className={classnames("ne-attachments", { [className]: className })}>
      <div className="ne-attachments__items">
        {attachments.map(attachment => (
          <Attachment
            attachment={attachment}
            attachments={attachments}
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
          multiple
          disabled={isUploading}
          ref={attachmentInputRef}
          type="file"
          onChange={handleAddFile}
        />
      </div>
    </div>
  );
};

export default React.forwardRef(Attachments);
