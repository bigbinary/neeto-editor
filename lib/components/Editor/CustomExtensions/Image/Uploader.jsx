import React, { useState } from "react";

import Modal from "components/Common/Modal";
import Tab from "components/Common/Tab";

import { IMAGE_UPLOAD_OPTIONS } from "./constants";
import ImageEditor from "./ImageEditor";
import LocalUploader from "./LocalUploader";
import UnsplashImagePicker from "./UnsplashImagePicker";
import URLForm from "./URLForm";

const Uploader = ({
  isOpen,
  onClose,
  editor,
  imageUploadUrl,
  uploadConfig,
  unsplashApiKey,
}) => {
  const [activeTab, setActiveTab] = useState("local");
  const [imageUrl, setImageUrl] = useState("");

  const tabs = unsplashApiKey
    ? IMAGE_UPLOAD_OPTIONS
    : IMAGE_UPLOAD_OPTIONS.slice(0, 2);

  const handleClose = () => {
    onClose();
    setImageUrl("");
    setActiveTab("local");
  };

  return (
    <Modal closeButton={false} isOpen={isOpen} onClose={handleClose}>
      <div className="neeto-editor-image-uploader">
        <Tab>
          {tabs.map(({ key, title }) => (
            <Tab.Item
              active={activeTab === key}
              key={key}
              onClick={() => setActiveTab(key)}
            >
              {title}
            </Tab.Item>
          ))}
        </Tab>
        <div className="neeto-editor-image-uploader__content">
          {imageUrl ? (
            <ImageEditor editor={editor} url={imageUrl} onClose={handleClose} />
          ) : (
            <>
              {activeTab === "local" && (
                <LocalUploader
                  endpoint={imageUploadUrl}
                  uploadConfig={uploadConfig}
                  onSuccess={setImageUrl}
                />
              )}
              {activeTab === "link" && (
                <URLForm
                  buttonLabel="Upload Image"
                  placeholder="Paste the image link"
                  onSubmit={setImageUrl}
                />
              )}
              {activeTab === "unsplash" && (
                <UnsplashImagePicker
                  unsplashApiKey={unsplashApiKey}
                  onSubmit={setImageUrl}
                />
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Uploader;
