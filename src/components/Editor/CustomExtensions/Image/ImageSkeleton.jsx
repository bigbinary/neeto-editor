import React from "react";

import "src/styles/editor/_image-skeleton.scss";

const ImageSkeleton = ({ height = 0, width = 0 }) => (
  <div className="card" style={{ height: `${height}px`, width: `${width}px` }}>
    <div className="skeleton" />
  </div>
);

export default ImageSkeleton;
