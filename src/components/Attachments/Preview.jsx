import React, { useRef } from "react";

import { findIndexBy } from "neetocist";
import { Download, Left, Right } from "neetoicons";
import { Modal, Typography, Button } from "neetoui";
import { isEmpty } from "ramda";
import DocViewer, { PDFRenderer, TXTRenderer } from "react-doc-viewer";
import { Trans, useTranslation } from "react-i18next";

import { checkPreviewAvailability, downloadFile } from "./utils";

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
    contentType = null,
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

  const handleKeyDown = event => {
    if (event.key === "ArrowRight") {
      handleRightArrowClick();
    } else if (event.key === "ArrowLeft") {
      handleLeftArrowClick();
    }
  };

  const handleDownload = () => downloadFile(url, filename);

  const setPreview = () => {
    const isPreviewAvailable = checkPreviewAvailability(contentType);

    if (isPreviewAvailable) {
      switch (contentType.split("/")[0]) {
        case "image":
          return <img src={url} />;
        case "video":
          return <video controls src={url} />;
        case "application":
        case "text":
          return (
            <DocViewer
              className="h-full w-full"
              documents={[{ uri: url, fileType: contentType }]}
              pluginRenderers={[PDFRenderer, TXTRenderer]}
              config={{
                header: { disableHeader: true, disableFileName: true },
              }}
            />
          );
        default:
          return null;
      }
    }

    return (
      <Typography>
        <Trans
          i18nKey="neetoEditor.attachments.noPreview"
          components={{
            span: (
              <span
                className="ne-attachments-preview__body-download"
                onClick={handleDownload}
              />
            ),
          }}
        />
      </Typography>
    );
  };

  return (
    <Modal
      className="ne-attachments-preview"
      isOpen={!isEmpty(selectedAttachment)}
      size="fullScreen"
      {...{ onClose }}
      onKeyDown={handleKeyDown}
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
          label={t("neetoEditor.common.download")}
          ref={downloadRef}
          onClick={handleDownload}
        />
      </div>
    </Modal>
  );
};

export default Preview;
