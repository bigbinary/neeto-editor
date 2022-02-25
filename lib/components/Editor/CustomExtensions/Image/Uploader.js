import React from "react";
import Modal from "components/Common/Modal";
import Tab from "components/Common/Tab";
import useTabBar from "hooks/useTabBar";

import URLForm from "./URLForm";
import LocalUploader from "./LocalUploader";
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
  const [activeTab, setActiveTab] = useTabBar(IMAGE_UPLOAD_OPTIONS);

  const handleUrlFormSubmit = (url) => {
    editor.chain().focus().setImage({ src: url }).run();
    setIsVisible(false);
  };

  const tab = {
    local: () => (
      <LocalUploader enpoint={imageUploadUrl} onSuccess={handleUrlFormSubmit} />
    ),
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
          <ActiveTab />
        </div>
      </div>
    </Modal>
  );
};

export default ImageUpload;
