import React, { useRef } from "react";

import saveAs from "file-saver";
import { findIndexBy } from "neetocommons/pure";
import { Download, Left, Right } from "neetoicons";
import { Modal, Typography, Button } from "neetoui";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";

const Preview = ({
  onClose,
  attachments,
  selectedAttachment,
  setSelectedAttachment,
}) => {
  const { t } = useTranslation();
  const downloadRef = useRef(null);

  const {
    filename = "",
    contentType = "null",
    url = "",
    signedId = "",
  } = selectedAttachment;

  const attachmentIndex = findIndexBy({ signedId }, attachments);

  const handleRightArrowClick = () => {
    const newIndex = (attachmentIndex + 1) % attachments.length;
    setSelectedAttachment(attachments[newIndex]);
    downloadRef.current?.focus();
  };

  const handleLeftArrowClick = () => {
    const newIndex =
      (attachmentIndex - 1 + attachments.length) % attachments.length;
    setSelectedAttachment(attachments[newIndex]);
    downloadRef.current?.focus();
  };

  const handleDownload = () => {
    saveAs(url, filename);
  };

  const setPreview = () => {
    switch (contentType.split("/")[0]) {
      case "image":
        return <img src={url} />;
      case "video":
        return <video controls src={url} />;
      case "application":
        return <iframe src={url} />;
      default:
        return (
          <Typography className="ne-attachments-preview__body-message">
            {t("attachments.noPreview")}
            <Button
              label={t("common.download")}
              style="link"
              onClick={handleDownload}
            />
          </Typography>
        );
    }
  };

  return (
    <Modal
      className="ne-attachments-preview"
      isOpen={!isEmpty(selectedAttachment)}
      size="large"
      onClose={onClose}
      onKeyDown={event => {
        if (event.key === "ArrowRight") {
          handleRightArrowClick();
        } else if (event.key === "ArrowLeft") {
          handleLeftArrowClick();
        }
      }}
    >
      <Modal.Header className="ne-attachments-preview__header">
        <Typography style="h2">{filename}</Typography>
      </Modal.Header>
      <Modal.Body className="ne-attachments-preview__body">
        <Left
          className="ne-attachments-preview__body-left"
          onClick={handleLeftArrowClick}
        />
        <Right
          className="ne-attachments-preview__body-right"
          onClick={handleRightArrowClick}
        />
        {setPreview()}
      </Modal.Body>
      <div className="ne-attachments-preview__footer">
        <Button
          icon={Download}
          iconPosition="right"
          label={t("common.download")}
          ref={downloadRef}
          onClick={handleDownload}
        />
      </div>
    </Modal>
  );
};

export default Preview;
