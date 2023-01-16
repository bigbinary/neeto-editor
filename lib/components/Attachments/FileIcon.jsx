import React from "react";

import { FileIcon, defaultStyles } from "react-file-icon";

const File = ({ fileName }) => {
  const extension = fileName.match(/([^.]+)$/)[1];

  return (
    <div className="ne-attachments__attachment-file-icon">
      <FileIcon {...defaultStyles[extension]} extension={extension} />
    </div>
  );
};

export default File;
