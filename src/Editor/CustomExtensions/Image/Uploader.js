import React, { useState } from "react";
import { view } from "@risingstack/react-easy-state";
import Uppy from "@uppy/core";
import { useUppy } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";

import LocalUploader from "./LocalUploader";
import ProgressBar from "./ProgressBar";
import Modal from "../../../Common/Modal";
import useTabBar from "../../../hooks/useTabBar";
import Tab from "../../../Common/Tab";

import { tabBarOptions } from "./constants";
import sharedState from "../../sharedState";

const ImageUpload = ({ editor, imageUploadUrl }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useTabBar(tabBarOptions);

  const uppy = useUppy(() =>
    new Uppy({
      allowMultipleUploads: false,
      autoProceed: true,
      debug: true,
    })
      .use(XHRUpload, {
        endpoint: imageUploadUrl || "/api/v1/direct_uploads",
        formData: true,
        fieldName: "blob",
      })
      .on("upload", () => setIsUploading(true))
      .on("upload-success", (file, response) => {
        const url = response.body.imageURL;
        editor.chain().focus().setImage({ src: url }).run();
        sharedState.showImageUpload = false;
      })
      .on("cancel-all", () => setIsUploading(false))
      .on("complete", () => setIsUploading(false))
  );

  return (
    <Modal
      visible={sharedState.showImageUpload}
      onClose={() => (sharedState.showImageUpload = false)}
    >
      <div className="image-uploader__root">
        <Tab>
          {tabBarOptions.map((option) => (
            <Tab.Item
              active={activeTab === option.key}
              onClick={() => setActiveTab(option)}
            >
              {option.title}
            </Tab.Item>
          ))}
        </Tab>

        {isUploading ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <span className="label--primary">Uploading...</span>
            <span className="label--secondary">{uppy.getFiles()[0]?.name}</span>
            <ProgressBar uppy={uppy} />
          </div>
        ) : activeTab === "local" ? (
          <LocalUploader uppy={uppy} />
        ) : null}
      </div>
    </Modal>
  );
};

export default view(ImageUpload);
