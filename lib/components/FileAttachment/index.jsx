import React, { useRef, useState } from "react";

import Uppy from "@uppy/core";
import "@uppy/core/dist/style.css";
import "@uppy/progress-bar/dist/style.css";
import { useUppy } from "@uppy/react";
import { saveAs } from "file-saver";
import { isEmpty } from "ramda";

import directUploadsApi from "apis/direct_uploads";
import { DIRECT_UPLOAD_ENDPOINT } from "common/constants";
import Button from "components/Common/Button";
import { convertToFileSize } from "components/Editor/MediaUploader/utils";
import ActiveStorageUpload from "utils/ActiveStorageUpload";

import Attachments from "./Attachments";
import {
  DEFAULT_UPPY_CONFIG,
  DROP_DOWN_OPTIONS_KEYS,
  UPPY_UPLOAD_CONFIG,
} from "./constant";

import Progress from "../Editor/MediaUploader/Progress";

const FileAttachment = ({ uploadEndpoint = DIRECT_UPLOAD_ENDPOINT }) => {
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const onClickAttachment = () => fileInputRef?.current?.click();

  const uppyConfig = { ...DEFAULT_UPPY_CONFIG };
  const uppy = useUppy(() =>
    new Uppy({
      ...uppyConfig,
      onBeforeFileAdded: file => {
        const { maxFileSize, allowedFileTypes } = uppyConfig.restrictions;

        if (file.size > maxFileSize) {
          setError(
            `File size is too large. Max size is  ${convertToFileSize(
              uppyConfig.restrictions.maxFileSize
            )}.`
          );

          return false;
        } else if (!allowedFileTypes.includes(`.${file.extension}`)) {
          setError(
            `File type is not permitted. Allowed file types are: ${allowedFileTypes.join(
              ", "
            )}.`
          );

          return false;
        }

        return true;
      },
    })
      .use(ActiveStorageUpload, {
        directUploadUrl: uploadEndpoint,
        ...UPPY_UPLOAD_CONFIG,
      })
      .on("upload", () => {
        setError("");
        setIsUploading(true);
      })
      .on("cancel-all", () => setIsUploading(false))
      .on("complete", () => {
        fileInputRef.current.value = null;
        uppy.reset();
        setIsUploading(false);
      })
  );

  const onSelectAttachment = async e => {
    const files = Array.from(e?.target.files);
    try {
      for (const file of files) {
        uppy.addFile({
          name: file.name,
          type: file.type,
          data: file,
        });
      }

      const { successful = [], failed = [] } = await uppy.upload();
      if (!isEmpty(successful)) {
        setUploadedFiles([...uploadedFiles, ...successful]);
      }

      if (failed.length > 0) {
        const errorMessages = failed.map(file => file?.error.message).join(",");
        setError(errorMessages);
      }
    } catch {}
  };

  const handleDelete = async file => {
    const { signed_id: signedId } = file.response;
    try {
      await directUploadsApi.destroy(`${uploadEndpoint}/${signedId}`);
      setUploadedFiles(
        uploadedFiles.filter(
          uploadedFile => uploadedFile.response.signed_id !== signedId
        )
      );
    } catch {
      setError(`Something went wrong while deleting file: ${file.name}`);
    }
  };

  const handleRename = async (newAttachment, callback) => {
    try {
      const { fileName, signedId } = newAttachment;
      const payload = {
        blob: { filename: fileName },
      };

      const response = await directUploadsApi.create(
        `${uploadEndpoint}/${signedId}/`,
        payload
      );
      const { blob = {} } = response.data;

      if (!isEmpty(blob)) {
        const updatedFiles = uploadedFiles.map(file =>
          file.response.signed_id === signedId
            ? { ...file, name: blob?.filename }
            : file
        );
        setUploadedFiles([...updatedFiles]);
        callback(true);
      }
    } catch {}
  };

  const handleView = ({ response, name }) => {
    if (response && response.blob_url) {
      saveAs(response.blob_url, name);
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
      handler: null,
    },
  ];

  return (
    <div className="neeto-editor-attachment-uploader__dnd-wrapper">
      {isUploading && <Progress uppy={uppy} />}
      <Attachments
        dropDownOptions={dropDownOptions}
        handleRename={handleRename}
        uploadedFiles={uploadedFiles}
      />
      {error && (
        <p className="neeto-editor-attachment-uploader__dnd--error pl-2 text-red-500">
          {error}
        </p>
      )}
      <div className="neeto-editor-attachment-uploader-btn-container py-3">
        <Button
          data-cy="neeto-editor-file-upload-button"
          disabled={isUploading}
          label="Add attachments"
          size="medium"
          style="link"
          onClick={onClickAttachment}
        />
      </div>
      <input
        multiple
        className="hidden neeto-editor-attachment-input"
        disabled={isUploading}
        id="file-input"
        ref={fileInputRef}
        type="file"
        onChange={onSelectAttachment}
      />
    </div>
  );
};

export default FileAttachment;
