import React, { useState } from "react";

import saveAs from "file-saver";
import { MenuVertical, File } from "neetoicons";
import { Dropdown, Input, Toastr, Typography, Tooltip } from "neetoui";
import { assoc } from "ramda";

import directUploadsApi from "apis/direct_uploads";

import { ATTACHMENT_OPTIONS } from "./constants";
import { validFileName } from "./utils";

const { Menu, MenuItem } = Dropdown;

const AttachmentCard = ({ attachment, endpoint, onChange, attachments }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newFilename, setNewFilename] = useState("");
  const [error, setError] = useState("");

  const handleDownload = () => {
    saveAs(attachment.url, attachment.fileName);
  };

  const handleRename = async () => {
    try {
      const { signedId } = attachment;
      const payload = {
        blob: { filename: newFilename },
      };

      await directUploadsApi.update(endpoint, signedId, payload);
      setIsRenaming(false);
      setNewFilename("");
      onChange(
        attachments.map(attachment =>
          attachment.signedId === signedId
            ? assoc("filename", newFilename, attachment)
            : attachment
        )
      );
    } catch (error) {
      Toastr.error(error.message);
      setIsRenaming(false);
      setNewFilename("");
    }
  };

  const handleDelete = async () => {
    try {
      const { signedId } = attachment;
      await directUploadsApi.destroy(endpoint, signedId);
      onChange(
        attachments.filter(attachment => attachment.signedId !== signedId)
      );
    } catch (error) {
      Toastr.error(error.message);
    }
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

  const onMenuItemClick = ({ key, handler }) => {
    if (key === ATTACHMENT_OPTIONS.RENAME) {
      setIsRenaming(true);
      setNewFilename(attachment.filename);
    } else {
      handler();
    }
  };

  const handleKeyDown = ({ event, key }) => {
    const { handler = undefined } = DROPDOWN_OPTIONS.find(
      option => option.label === key
    );

    if (event.key === "Enter" && handler && error === "") {
      handler();
    }

    if (event.key === "Escape") {
      setIsRenaming(false);
      setNewFilename("");
    }
  };

  const handleInputChange = value => {
    const error = validFileName(value);
    setError(error);
    setNewFilename(value);
  };

  return (
    <div className="ne-file-attachment-wrapper">
      <Tooltip content={attachment.filename} position="top">
        <div className="ne-file-attachment-inner-wrapper">
          <div>
            <File className="icon-opacity-75" size={25} />
          </div>
          {isRenaming ? (
            <Input
              autoFocus
              className="input-width"
              error={error}
              type="text"
              value={newFilename}
              onChange={event => {
                handleInputChange(event.target.value);
              }}
              onKeyDown={event =>
                handleKeyDown({
                  event,
                  key: ATTACHMENT_OPTIONS.RENAME,
                })
              }
            />
          ) : (
            <Typography className="truncate-ellipsis">
              {attachment.filename}
            </Typography>
          )}
        </div>
      </Tooltip>
      <div className="drop-down-container">
        <Dropdown buttonStyle="text" icon={MenuVertical}>
          <Menu>
            {DROPDOWN_OPTIONS.map(({ label, handler }) => (
              <MenuItem.Button
                key={label}
                onClick={() => onMenuItemClick({ key: label, handler })}
              >
                {label}
              </MenuItem.Button>
            ))}
          </Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default AttachmentCard;
