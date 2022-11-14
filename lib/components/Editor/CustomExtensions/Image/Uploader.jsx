import React, { useState } from "react";

import Modal from "components/Common/Modal";
import Tab from "components/Common/Tab";
import useTabBar from "hooks/useTabBar";

import { IMAGE_UPLOAD_OPTIONS } from "./constants";
import ImageEditor from "./ImageEditor";
import LocalUploader from "./LocalUploader";
import UnsplashImagePicker from "./UnsplashImagePicker";
import URLForm from "./URLForm";

const ImageUpload = ({
  isOpen,
  onClose,
  editor,
  imageUploadUrl,
  uploadConfig,
  unsplashApiKey,
}) => {
  const [activeTab, setActiveTab] = useTabBar(IMAGE_UPLOAD_OPTIONS);
  const [imageUrl, setImageUrl] = useState("");
  const isUnsplashImageUploadActive = !!unsplashApiKey;

  const handleUrlFormSubmit = url => {
    setImageUrl(url);
  };

  const tab = {
    local: () => (
      <LocalUploader
        endpoint={imageUploadUrl}
        uploadConfig={uploadConfig}
        onSuccess={handleUrlFormSubmit}
      />
    ),
    link: () => (
      <URLForm
        buttonLabel="Upload Image"
        placeholder="Paste the image link"
        onSubmit={handleUrlFormSubmit}
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
      closeButton={false}
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setActiveTab(IMAGE_UPLOAD_OPTIONS[0]);
      }}
    >
      <div className="neeto-editor-image-uploader">
        <Tab>
          {IMAGE_UPLOAD_OPTIONS.filter(
            option => option.key !== "unsplash" || isUnsplashImageUploadActive
          ).map(option => (
            <Tab.Item
              active={activeTab === option.key}
              key={option.key}
              onClick={() => setActiveTab(option)}
            >
              {option.title}
            </Tab.Item>
          ))}
        </Tab>
        <div className="neeto-editor-image-uploader__content">
          {imageUrl ? (
            <ImageEditor
              editor={editor}
              url={imageUrl}
              onClose={() => {
                setImageUrl("");
                onClose();
              }}
            />
          ) : (
            <ActiveTab />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ImageUpload;
