import React, { useRef } from "react";

import saveAs from "file-saver";
import { findIndexBy } from "neetocommons/pure";
import { Download, LeftArrow, RightArrow } from "neetoicons";
import { Modal, Typography, Button } from "neetoui";
import { useTranslation } from "react-i18next";

const PreviewModal = ({
  isOpen,
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

  const index = findIndexBy({ signedId }, attachments);

  const handleRightArrowClick = () => {
    const newIndex = (index + 1) % attachments.length;
    setSelectedAttachment(attachments[newIndex]);
    downloadRef.current?.focus();
  };

  const handleLeftArrowClick = () => {
    const newIndex = (index - 1 + attachments.length) % attachments.length;
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
          <Typography
            className="ne-attachments-preview__body-message"
            onClick={handleDownload}
          >
            {t("attachmentsPreview.noPreview")}
          </Typography>
        );
    }
  };

  return (
    <Modal
      className="ne-attachments-preview"
      isOpen={isOpen}
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
        <Button
          className="ne-attachments-preview__body-left"
          icon={LeftArrow}
          style="text"
          onClick={handleLeftArrowClick}
        />
        <Button
          className="ne-attachments-preview__body-right"
          icon={RightArrow}
          style="text"
          onClick={handleRightArrowClick}
        />
        {setPreview()}
      </Modal.Body>
      <Modal.Footer className="ne-attachments-preview__footer">
        <Button
          icon={Download}
          iconPosition="right"
          label={t("attachmentsPreview.download")}
          ref={downloadRef}
          onClick={handleDownload}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default PreviewModal;
