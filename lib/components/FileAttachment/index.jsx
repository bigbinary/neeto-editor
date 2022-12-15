import React, { useRef } from "react";

import { saveAs } from "file-saver";

import directUploadsApi from "apis/direct_uploads";
import { DIRECT_UPLOAD_ENDPOINT } from "common/constants";
import Button from "components/Common/Button";
import useUppyUploader from "hooks/useUppyUploader";

import Attachment from "./Attachment";
import {
  DEFAULT_UPPY_CONFIG,
  DROP_DOWN_OPTIONS_KEYS,
  UPPY_UPLOAD_CONFIG,
} from "./constant";

import Progress from "../Editor/MediaUploader/Progress";

const FileAttachment = ({
  endpoint = DIRECT_UPLOAD_ENDPOINT,
  attachments = [],
  onChange = _ => {},
}) => {
  const fileInputRef = useRef(null);
  const uppyConfig = { ...DEFAULT_UPPY_CONFIG };

  const { uppy, isUploading } = useUppyUploader({
    endpoint,
    uppyConfig,
    uppyUploadConfig: { ...UPPY_UPLOAD_CONFIG },
  });

  const onUpload = async event => {
    try {
      for (const file of Array.from(event.target.files)) {
        uppy.addFile({
          name: file.name,
          type: file.type,
          data: file,
        });
      }
      const { successful = [] } = await uppy.upload();

      const uploadedFiles = successful.map(uploadedFile => ({
        filename: uploadedFile.name,
        signedId: uploadedFile.response.signed_id,
        contentType: uploadedFile.type,
        url: uploadedFile.response.blob_url,
      }));
      onChange([...attachments, ...uploadedFiles]);
    } catch {}
  };

  const handleDelete = async attachment => {
    const { signedId } = attachment;

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

  const handleView = ({ url, filename }) => {
    if (url && filename) {
      saveAs(url, filename);
    }
  };

  const dropDownOptions = [
    {
      key: DROP_DOWN_OPTIONS_KEYS.VIEW,
      label: DROP_DOWN_OPTIONS_KEYS.VIEW,
      handler: handleView,
    },
    {
      key: DROP_DOWN_OPTIONS_KEYS.DELETE,
      label: DROP_DOWN_OPTIONS_KEYS.DELETE,
      handler: handleDelete,
    },
    {
      key: DROP_DOWN_OPTIONS_KEYS.RENAME,
      label: DROP_DOWN_OPTIONS_KEYS.RENAME,
      handler: () => handleRename,
    },
  ];

  return (
    <div>
      {isUploading && <Progress uppy={uppy} />}
      <div className="ne-file-attachments-inner-wrapper">
        {attachments.map(attachment => (
          <Attachment
            attachment={attachment}
            dropDownOptions={dropDownOptions}
            key={attachment.signedId}
          />
        ))}
      </div>
      <div className="upload-btn">
        <Button
          disabled={isUploading}
          label="Add attachments"
          size="medium"
          style="link"
          onClick={() => fileInputRef.current.click()}
        />
      </div>
      <input
        multiple
        className="file-input"
        disabled={isUploading}
        id="file-input"
        ref={fileInputRef}
        type="file"
        onChange={onUpload}
      />
    </div>
  );
};

export default FileAttachment;
