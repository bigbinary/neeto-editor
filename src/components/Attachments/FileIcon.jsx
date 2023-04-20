import React from "react";

import { FileIcon, defaultStyles } from "react-file-icon";

const File = ({ fileName }) => {
  const extension = fileName.match(/([^.]+)$/)[1];

  return (
    <div className="ne-attachments__preview-wrapper__icon">
      <FileIcon
        extension={extension}
        labelColor="#4558f9"
        {...defaultStyles[extension]}
      />
    </div>
  );
};

export default File;
