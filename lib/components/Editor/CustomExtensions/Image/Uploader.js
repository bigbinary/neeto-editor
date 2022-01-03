import React, { useState, useMemo } from "react";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import Modal from "components/Common/Modal";
import Tab from "components/Common/Tab";
import useTabBar from "hooks/useTabBar";

import URLForm from "./URLForm";
import LocalUploader from "./LocalUploader";
import ProgressBar from "./ProgressBar";
import UnsplashImagePicker from "./UnsplashImagePicker";

import { IMAGE_UPLOAD_OPTIONS } from "./constants";

const ImageUpload = ({
  editor,
  imageUploadUrl,
  isVisible,
  setIsVisible,
  unsplashApiKey,
  isUnsplashImageUploadActive,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useTabBar(IMAGE_UPLOAD_OPTIONS);

  const uppy = useMemo(
    () =>
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
          setIsVisible(false);
        })
        .on("cancel-all", () => setIsUploading(false))
        .on("complete", () => setIsUploading(false)),
    [editor]
  );

  const handleUrlFormSubmit = (url) => {
    editor.chain().focus().setImage({ src: url }).run();
    setIsVisible(false);
  };

  const tab = {
    local: () => <LocalUploader uppy={uppy} />,
    link: () => (
      <URLForm
        onSubmit={handleUrlFormSubmit}
        buttonLabel="Upload Image"
        placeholder="Paste the image link"
      />
    ),
    unsplash: () => (
      <UnsplashImagePicker
        unsplashApiKey={unsplashApiKey}
        onSubmit={handleUrlFormSubmit}
      />
    ),
  };

  const ActiveTab = tab[activeTab];

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => setIsVisible(false)}
      closeButton={false}
    >
      <div className="neeto-editor-image-uploader">
        <Tab>
          {IMAGE_UPLOAD_OPTIONS.filter(
            (option) => option.key !== "unsplash" || isUnsplashImageUploadActive
          ).map((option) => (
            <Tab.Item
              key={option.key}
              active={activeTab === option.key}
              onClick={() => setActiveTab(option)}
            >
              {option.title}
            </Tab.Item>
          ))}
        </Tab>

        <div className="neeto-editor-image-uploader__content">
          {isUploading ? (
            <div className="neeto-editor-image-uploader__progress">
              <p className="neeto-editor-image-uploader__progress-title">
                Uploading...
              </p>
              <p className="neeto-editor-image-uploader__progress-file">
                {uppy.getFiles()[0]?.name}
              </p>
              <ProgressBar uppy={uppy} />
            </div>
          ) : (
            <ActiveTab />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ImageUpload;
