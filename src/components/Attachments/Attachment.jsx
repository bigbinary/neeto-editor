import React, { useState } from "react";

import { removeBy } from "neetocist";
import { withEventTargetValue } from "neetocommons/utils";
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
import { Trans, useTranslation } from "react-i18next";

import directUploadsApi from "apis/direct_uploads";

import { ATTACHMENT_OPTIONS } from "./constants";
import FileIcon from "./FileIcon";
import { checkPreviewAvailability, downloadFile } from "./utils";

const { Menu, MenuItem } = Dropdown;

const Attachment = ({
  attachment,
  attachments,
  disabled,
  onChange,
  setSelectedAttachment,
  showToastr,
}) => {
  const { t } = useTranslation();

  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newFilename, setNewFilename] = useState("");

  const handleDownload = () =>
    downloadFile(attachment.url, attachment.filename);

  const handleRename = async () => {
    try {
      const { signedId } = attachment;
      const payload = { blob: { filename: newFilename } };

      const {
        data: {
          blob: { filename },
        },
      } = await directUploadsApi.update({
        signedId,
        payload,
        showToastr,
      });

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
      await directUploadsApi.destroy(signedId, showToastr);
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
      event.stopPropagation();
      event.preventDefault();
      handler();
    }

    if (event.key === "Escape") {
      setIsRenaming(false);
      setNewFilename("");
    }
  };

  const handleAttachmentSelection = () => {
    const contentType = attachment?.contentType;
    const hasPreview = checkPreviewAvailability(contentType);

    hasPreview ? setSelectedAttachment(attachment) : handleDownload();
  };

  return (
    <>
      <div className="ne-attachments__preview">
        {isRenaming ? (
          <>
            <Tooltip content={newFilename} position="top">
              <Input
                autoFocus
                data-cy="neeto-editor-preview-rename-input"
                size="small"
                value={newFilename}
                error={
                  isEmpty(newFilename)
                    ? t("neetoEditor.attachments.nameEmpty")
                    : ""
                }
                onChange={withEventTargetValue(setNewFilename)}
                onKeyDown={event =>
                  handleKeyDown({
                    event,
                    key: ATTACHMENT_OPTIONS.RENAME,
                  })
                }
              />
            </Tooltip>
            <Button
              data-cy="neeto-editor-preview-rename-cancel-button"
              icon={Close}
              size="small"
              style="text"
              onClick={() => setIsRenaming(false)}
            />
          </>
        ) : (
          <>
            <div
              className="ne-attachments__preview-wrapper"
              onClick={handleAttachmentSelection}
            >
              <FileIcon fileName={attachment.filename} />
              <Tooltip content={attachment.filename} position="top">
                <Typography style="body2">{attachment.filename}</Typography>
              </Tooltip>
            </div>
            <Tooltip
              content={t("neetoEditor.attachments.actionsBlocked")}
              disabled={!disabled}
              position="top"
            >
              <Dropdown
                buttonSize="small"
                buttonStyle="text"
                {...{ disabled }}
                icon={MenuVertical}
              >
                <Menu>
                  {Object.entries(handlers).map(([label, handler]) => (
                    <MenuItem.Button
                      data-cy={`neeto-editor-preview-${label.toLowerCase()}-button`}
                      key={label}
                      onClick={() => onMenuItemClick({ key: label, handler })}
                    >
                      {label}
                    </MenuItem.Button>
                  ))}
                </Menu>
              </Dropdown>
            </Tooltip>
          </>
        )}
      </div>
      <Alert
        isOpen={isDeleteAlertOpen}
        isSubmitting={isDeleting}
        submitButtonLabel={t("neetoEditor.menu.delete")}
        title={t("neetoEditor.attachments.deleteTitle")}
        message={
          <Trans
            i18nKey="neetoEditor.attachments.deleteConfirmation"
            values={{ entity: newFilename }}
          />
        }
        onClose={() => setIsDeleteAlertOpen(false)}
        onSubmit={handleDelete}
      />
    </>
  );
};

export default Attachment;
