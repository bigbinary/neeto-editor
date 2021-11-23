import React from "react";

import { DragDrop } from "@uppy/react";

const LocalUploader = ({ uppy }) => {
  return (
    <DragDrop
      note="Max. File Size: 5MB"
      uppy={uppy}
      locale={{
        strings: {
          dropHereOr: "Drop your file(s) here or %{browse}",
          browse: "Browse",
        },
      }}
      className="local-upload__root"
    />
  );
};

export default LocalUploader;
