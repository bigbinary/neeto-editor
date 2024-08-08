import { useState } from "react";

import classNames from "classnames";
import { isPresent } from "neetocist";
import { Close } from "neetoicons";
import { Button, Modal, Spinner } from "neetoui";
import { isNil } from "ramda";

const ImagePreviewModal = ({ previewUrl, setPreviewUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => setIsLoading(false);

  const handleClose = () => {
    setIsLoading(true);
    setPreviewUrl(null);
  };

  return (
    <Modal
      className="image-preview-neeto-ui-modal"
      closeButton={false}
      isOpen={isPresent(previewUrl)}
      size="fullScreen"
      onClose={handleClose}
    >
      <>
        {isLoading || isNil(previewUrl) ? (
          <div className="spinner-wrapper">
            <Spinner className="spinner" theme="light" />
          </div>
        ) : (
          <Button
            className="image-preview-neeto-ui-modal__close-btn"
            icon={Close}
            style="secondary"
            onClick={handleClose}
            onKeyDown={e => e.key === "Escape" && handleClose}
          />
        )}
        <img
          alt="Preview"
          src={previewUrl}
          className={classNames({
            "display-none": isLoading || isNil(previewUrl),
          })}
          onLoad={handleImageLoad}
        />
      </>
    </Modal>
  );
};

export default ImagePreviewModal;
