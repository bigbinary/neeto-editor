import React, { useRef, useEffect, useState } from "react";

import classnames from "classnames";
import { Button, Typography, Toastr } from "neetoui";

import { DIRECT_UPLOAD_ENDPOINT } from "common/constants";
import useUppyUploader from "hooks/useUppyUploader";

import AttachmentCard from "./AttachmentCard";
import AttachmentProgressCard from "./AttachmentProgressCard";
import { DEFAULT_UPPY_CONFIG, UPPY_UPLOAD_CONFIG } from "./constants";

const Attachment = ({
  endpoint = DIRECT_UPLOAD_ENDPOINT,
  attachments = [],
  className,
  onChange,
}) => {
  const [fileProgresses, setFileProgresses] = useState([]);

  const addFileRef = useRef(null);

  const { uppy, isUploading } = useUppyUploader({
    endpoint,
    uppyConfig: DEFAULT_UPPY_CONFIG,
    uppyUploadConfig: UPPY_UPLOAD_CONFIG,
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

    const newlyAddedFiles = [
      ...uppy.getFiles().map(file => ({
        filename: file.name,
        signedId: "awaiting",
        url: "",
        progress: 0,
      })),
    ];
    setFileProgresses(prevState => [...prevState, ...newlyAddedFiles]);
    handleUpload();
  };

  const handleUpload = async () => {
    try {
      const { successful = [] } = await uppy.upload();
      uppy.reset();
      const uploadedFiles = successful.map(file => ({
        filename: file.name,
        signedId: file.response.signed_id,
        url: file.response.blob_url,
      }));

      setFileProgresses(prevState => [
        ...prevState.filter(attachment => attachment.progress !== 100),
      ]);
      onChange([...attachments, ...uploadedFiles]);
    } catch {
      Toastr.error("Upload failed.");
    }
  };

  const handleUploadProgress = (file, progress) => {
    setFileProgresses(prevState =>
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
    <div className={classnames({ [className]: className })}>
      <Typography style="h5">Attachments</Typography>
      <div className="ne-file-attachments-inner-wrapper">
        {attachments.map(attachment => (
          <AttachmentCard
            attachment={attachment}
            attachments={attachments}
            endpoint={endpoint}
            key={attachment.signedId}
            onChange={onChange}
          />
        ))}
        {isUploading &&
          fileProgresses.map(attachment => (
            <AttachmentProgressCard
              attachment={attachment}
              key={attachment.filename}
            />
          ))}
      </div>
      <div className="upload-btn">
        <Button
          label="Add attachments"
          size="medium"
          style="link"
          onClick={() => addFileRef.current.click()}
        />
        <input
          multiple
          disabled={isUploading}
          ref={addFileRef}
          type="file"
          onChange={handleAddFile}
        />
      </div>
    </div>
  );
};
export default Attachment;
