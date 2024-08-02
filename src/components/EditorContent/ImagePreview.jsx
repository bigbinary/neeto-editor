import React, { useEffect, useRef, useState } from "react";

import classnames from "classnames";
import { useOnClickOutside } from "neetocommons/react-utils";
import { Close } from "neetoicons";
import { Button, Spinner } from "neetoui";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

const ImagePreview = ({ imagePreviewDetails, setImagePreviewDetails }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();

  const imagePreviewRef = useRef(null);

  useOnClickOutside(imagePreviewRef, () => setImagePreviewDetails(null), {
    enabled: true,
  });

  useEffect(() => {
    document.addEventListener(
      "keydown",
      e => e.key === "Escape" && setImagePreviewDetails(null)
    );

    return () =>
      document.removeEventListener(
        "keydown",
        e => e.key === "Escape" && setImagePreviewDetails(null)
      );
  }, []);

  return createPortal(
    <div className="ne-image-preview-wrapper">
      {isLoading && <Spinner className="ne-image-preview-wrapper__spinner" />}
      {!isLoading && (
        <div className="close-button">
          <Button
            icon={Close}
            style="secondary"
            onClick={() => setImagePreviewDetails(null)}
          />
        </div>
      )}
      <div
        className={classnames("ne-image-preview", {
          "image-loaded": !isLoading,
        })}
      >
        <img
          alt={t("neetoEditor.editorContent.imagePreviewAltText")}
          ref={imagePreviewRef}
          src={imagePreviewDetails.src}
          onLoad={() => setIsLoading(false)}
        />
        {imagePreviewDetails && (
          <p className="ne-image-preview__caption">
            {imagePreviewDetails.caption}
          </p>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ImagePreview;
