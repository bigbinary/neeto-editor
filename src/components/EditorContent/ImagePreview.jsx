import React, { useEffect, useRef, useState } from "react";

import { useOnClickOutside } from "neetocommons/react-utils";
import { Close } from "neetoicons";
import { Button, Spinner } from "neetoui";
import { createPortal } from "react-dom";

const ImagePreview = ({ imagePreviewUrl, setImagePreviewUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  const imagePreviewRef = useRef(null);

  useOnClickOutside(imagePreviewRef, () => setImagePreviewUrl(null), {
    enabled: true,
  });

  useEffect(() => {
    document.addEventListener(
      "keydown",
      e => e.key === "Escape" && setImagePreviewUrl(null)
    );

    return () =>
      document.removeEventListener(
        "keydown",
        e => e.key === "Escape" && setImagePreviewUrl(null)
      );
  }, []);

  return createPortal(
    <div className="image-preview-wrapper">
      <div className="close-button">
        <Button
          icon={Close}
          style="secondary"
          onClick={() => setImagePreviewUrl(null)}
        />
      </div>
      {isLoading && <Spinner className="spinner" />}
      <img
        alt="Image Preview"
        className="image-preview"
        ref={imagePreviewRef}
        src={imagePreviewUrl}
        onLoad={() => setIsLoading(false)}
      />
    </div>,
    document.body
  );
};

export default ImagePreview;
