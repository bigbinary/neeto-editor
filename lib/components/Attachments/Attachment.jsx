import React, { useState } from "react";

import saveAs from "file-saver";
import { MenuVertical, File, Close } from "neetoicons";
import {
  Dropdown,
  Input,
  Toastr,
  Tooltip,
  Typography,
  Button,
  Alert,
} from "neetoui";
import { assoc } from "ramda";

import directUploadsApi from "apis/direct_uploads";

import { ATTACHMENT_OPTIONS } from "./constants";

const { Menu, MenuItem } = Dropdown;

const Attachment = ({ attachment, endpoint, onChange, attachments }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [newFilename, setNewFilename] = useState("");

  const handleDownload = () => {
    saveAs(attachment.url, attachment.fileName);
  };

  const handleRename = async () => {
    try {
      const { signedId } = attachment;
      const payload = {
        blob: { filename: newFilename },
      };

      const {
        data: {
          blob: { filename },
        },
      } = await directUploadsApi.update(endpoint, signedId, payload);

      onChange(
        attachments.map(attachment =>
          attachment.signedId === signedId
            ? assoc("filename", filename, attachment)
            : attachment
        )
      );
    } catch (error) {
      Toastr.error(error);
    } finally {
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
      Toastr.error(error);
    } finally {
      setIsDeleteAlertOpen(false);
      setNewFilename("");
    }
  };

  const handlers = {
    [ATTACHMENT_OPTIONS.DOWNLOAD]: handleDownload,
    [ATTACHMENT_OPTIONS.RENAME]: handleRename,
    [ATTACHMENT_OPTIONS.DELETE]: handleDelete,
  };

  const onMenuItemClick = ({ key, handler }) => {
    if (key === ATTACHMENT_OPTIONS.RENAME) {
      setIsRenaming(true);
      setNewFilename(attachment.filename);
    } else if (key === ATTACHMENT_OPTIONS.DELETE) {
      setNewFilename(attachment.filename);
      setIsDeleteAlertOpen(true);
    } else {
      handler();
    }
  };

  const handleKeyDown = ({ event, key }) => {
    const handler = handlers[key];

    if (event.key === "Enter" && handler) {
      handler();
    }

    if (event.key === "Escape") {
      setIsRenaming(false);
      setNewFilename("");
    }
  };

  return (
    <div className="ne-file-attachment-card-wrapper">
      <div className="ne-file-attachment-inner-wrapper">
        {isRenaming ? (
          <>
            <Tooltip content={newFilename} position="top">
              <Input
                autoFocus
                className="rename-input"
                value={newFilename}
                onChange={e => setNewFilename(e.target.value)}
                onKeyDown={event =>
                  handleKeyDown({
                    event,
                    key: ATTACHMENT_OPTIONS.RENAME,
                  })
                }
              />
            </Tooltip>
            <Button
              icon={Close}
              style="secondary"
              onClick={() => setIsRenaming(false)}
            />
          </>
        ) : (
          <>
            <File size={25} />
            <Tooltip content={attachment.filename} position="top">
              <Typography className="truncate-ellipsis">
                {attachment.filename}
              </Typography>
            </Tooltip>
            <div className="drop-down-container">
              <Dropdown buttonStyle="text" icon={MenuVertical}>
                <Menu>
                  {Object.entries(handlers).map(([label, handler]) => (
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
          </>
        )}
      </div>
      <Alert
        isOpen={isDeleteAlertOpen}
        message={`Are you sure you want to remove ${newFilename}?`}
        title="Remove Attachment?"
        onClose={() => setIsDeleteAlertOpen(false)}
        onSubmit={() => handleDelete()}
      />
    </div>
  );
};

export default Attachment;
