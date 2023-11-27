import React, { useRef, useState } from "react";

import { useOnClickOutside } from "neetocommons/react-utils";
import { CloseCircle } from "neetoicons";
import { Button, Spinner } from "neetoui";

const ImagePreview = ({ imagePreviewUrl, setImagePreviewUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  const imagePreviewRef = useRef(null);

  useOnClickOutside(imagePreviewRef, () => setImagePreviewUrl(null), {
    enabled: true,
  });

  return (
    <div className="image-preview-wrapper">
      <div className="close-button">
        <Button
          icon={CloseCircle}
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
    </div>
  );
};

export default ImagePreview;
