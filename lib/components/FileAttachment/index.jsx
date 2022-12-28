import React, { useRef, useEffect, useState } from "react";

import { saveAs } from "file-saver";
import { Button, Typography } from "neetoui";

import directUploadsApi from "apis/direct_uploads";
import { DIRECT_UPLOAD_ENDPOINT } from "common/constants";
import useUppyUploader from "hooks/useUppyUploader";

import Attachment from "./Attachment";
import AttachmentProgress from "./AttachmentProgress";
import { DEFAULT_UPPY_CONFIG, UPPY_UPLOAD_CONFIG } from "./constants";

const FileAttachment = ({
  endpoint = DIRECT_UPLOAD_ENDPOINT,
  attachments = [],
  onChange,
}) => {
  const [adding, setAdding] = useState(false);
  const [fileProgresses, setFileProgresses] = useState(
    attachments.map(attachment => ({
      filename: attachment.filename,
      signedId: attachment.signedId,
      url: attachment.url,
      progress: 100,
    }))
  );

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
    setAdding(true);
  };

  const handleUpload = async () => {
    try {
      const { successful = [] } = await uppy.upload();
      const uploadedFiles = successful.map(file => ({
        filename: file.name,
        signedId: file.response.signed_id,
        url: file.response.blob_url,
      }));

      setFileProgresses(prevState => [
        ...prevState.filter(attachment => attachment.progress !== 100),
      ]);
      onChange([...attachments, ...uploadedFiles]);
      setAdding(false);
    } catch {}
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

  const handleDelete = async ({ signedId }) => {
    try {
      await directUploadsApi.destroy(endpoint, signedId);
      onChange(
        attachments.filter(attachment => attachment.signedId !== signedId)
      );
    } catch {}
  };

  const handleRename = async (attachment, callback) => {
    try {
      const { fileName, signedId } = attachment;
      const payload = {
        blob: { filename: fileName },
      };

      await directUploadsApi.update(endpoint, signedId, payload);
      onChange(
        attachments.map(attachment =>
          attachment.signedId === signedId
            ? {
                ...attachment,
                filename: fileName,
              }
            : attachment
        )
      );
      callback(true);
    } catch {}
  };

  const handleDownload = ({ url = "", filename = "file.txt" }) => {
    saveAs(url, filename);
  };

  const DROPDOWN_OPTIONS = [
    {
      label: "Download",
      handler: handleDownload,
    },
    {
      label: "Rename",
      handler: handleRename,
    },
    {
      label: "Delete",
      handler: handleDelete,
    },
  ];

  useEffect(() => {
    if (adding) {
      uppy.on("upload-progress", handleUploadProgress);
      handleUpload();
    }

    return () => {
      uppy.off("upload-progress", handleUploadProgress);
    };
  }, [adding]);

  return (
    <div className="mt-2">
      <Typography style="h5">Attachments</Typography>
      <div className="ne-file-attachments-inner-wrapper">
        {attachments?.map(attachment => (
          <Attachment
            attachment={attachment}
            dropDownOptions={DROPDOWN_OPTIONS}
            key={attachment.signedId}
          />
        ))}
        {isUploading &&
          fileProgresses?.map(attachment => (
            <AttachmentProgress
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
          className="file-input"
          disabled={isUploading}
          id="file-input"
          ref={addFileRef}
          type="file"
          onChange={handleAddFile}
        />
      </div>
    </div>
  );
};
export default FileAttachment;
