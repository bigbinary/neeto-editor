import React from "react";
import { view } from "@risingstack/react-easy-state";
import Uppy from "@uppy/core";
import { DashboardModal } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import sharedState from "../../sharedState";

const ImageUpload = ({ editor }) => {
  const uppy = new Uppy({
    allowMultipleUploads: false,
    autoProceed: true,
    debug: true,
  });

  uppy.use(XHRUpload, {
    endpoint: "/api/v1/direct_uploads",
    formData: true,
    fieldName: "blob",
  });

  uppy.on("upload-success", (file, response) => {
    const url = response.body.imageURL;
    editor.chain().focus().setImage({ src: url }).run();
  });

  return (
    <div>
      <DashboardModal
        uppy={uppy}
        proudlyDisplayPoweredByUppy={false}
        closeModalOnClickOutside
        open={sharedState.showImageUpload}
        onRequestClose={() => (sharedState.showImageUpload = false)}
      />
    </div>
  );
};

export default view(ImageUpload);
