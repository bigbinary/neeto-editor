import React, { useRef, useEffect, useState } from "react";

import classnames from "classnames";
import { Button, Toastr } from "neetoui";

import { DIRECT_UPLOAD_ENDPOINT } from "common/constants";
import useUppyUploader from "hooks/useUppyUploader";

import Attachment from "./Attachment";
import AttachmentProgress from "./AttachmentProgress";
import { DEFAULT_UPPY_CONFIG } from "./constants";

const Attachments = ({
  endpoint = DIRECT_UPLOAD_ENDPOINT,
  attachments = [],
  className,
  onChange = _ => {},
}) => {
  const [pendingAttachments, setPendingAttachments] = useState([]);

  const addAttachmentRef = useRef(null);

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

    const newlyAddedFiles = files.map(file => ({
      filename: file.name,
      signedId: "awaiting",
      url: "",
      progress: 0,
    }));
    setPendingAttachments(prevState => [...prevState, ...newlyAddedFiles]);
    handleUpload();
  };

  const handleUpload = async () => {
    try {
      const { successful = [] } = await uppy.upload();
      const uploadedFiles = successful.map(file => ({
        filename: file.name,
        signedId: file.response.signed_id,
        url: file.response.blob_url,
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
            key={attachment.filename}
          />
        ))}
      </div>
      <div>
        <Button
          disabled={isUploading}
          label="Add attachments"
          loading={isUploading}
          size="medium"
          style="link"
          onClick={() => addAttachmentRef.current.click()}
        />
        <input
          multiple
          disabled={isUploading}
          ref={addAttachmentRef}
          type="file"
          onChange={handleAddFile}
        />
      </div>
    </div>
  );
};
export default Attachments;
