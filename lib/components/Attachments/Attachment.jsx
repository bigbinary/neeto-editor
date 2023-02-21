import React, { useState } from "react";

import saveAs from "file-saver";
import { MenuVertical, Close } from "neetoicons";
import {
  Dropdown,
  Input,
  Toastr,
  Tooltip,
  Typography,
  Button,
  Alert,
} from "neetoui";
import { isEmpty, assoc } from "ramda";
import { useTranslation } from "react-i18next";

import directUploadsApi from "apis/direct_uploads";
import { removeBy } from "neetocommons/pure";

import { ATTACHMENT_OPTIONS } from "./constants";
import FileIcon from "./FileIcon";

const { Menu, MenuItem } = Dropdown;

const Attachment = ({
  attachment,
  endpoint,
  onChange,
  attachments,
  disabled,
}) => {
  const { t } = useTranslation();

  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
        blob: { filename },
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
    setIsDeleting(true);
    try {
      const { signedId } = attachment;
      await directUploadsApi.destroy(endpoint, signedId);
      onChange(removeBy({ signedId }, attachments));
    } catch (error) {
      Toastr.error(error);
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

    if (event.key === "Enter" && handler && !isEmpty(newFilename)) {
      event.preventDefault();
      handler();
    }

    if (event.key === "Escape") {
      setIsRenaming(false);
      setNewFilename("");
    }
  };

  return (
    <>
      <div className="ne-attachments__attachment">
        {isRenaming ? (
          <>
            <Tooltip content={newFilename} position="top">
              <Input
                autoFocus
                error={isEmpty(newFilename) ? t("attachments.name-empty") : ""}
                size="small"
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
              size="small"
              style="text"
              onClick={() => setIsRenaming(false)}
            />
          </>
        ) : (
          <>
            <FileIcon fileName={attachment.filename} />
            <Tooltip content={attachment.filename} position="top">
              <Typography style="body2">{attachment.filename}</Typography>
            </Tooltip>
            <Tooltip
              content={t("attachments.actions-blocked")}
              disabled={!disabled}
              position="top"
            >
              <span>
                <Dropdown
                  buttonSize="small"
                  buttonStyle="text"
                  disabled={disabled}
                  icon={MenuVertical}
                >
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
              </span>
            </Tooltip>
          </>
        )}
      </div>
      <Alert
        isOpen={isDeleteAlertOpen}
        isSubmitting={isDeleting}
        message={t("attachments.delete-confirmation", { entity: newFilename })}
        title={t("attachments.delete-title")}
        onClose={() => setIsDeleteAlertOpen(false)}
        onSubmit={handleDelete}
      />
    </>
  );
};

export default Attachment;
