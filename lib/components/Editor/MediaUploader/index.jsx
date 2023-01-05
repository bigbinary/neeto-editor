import React, { useState } from "react";

import { Modal, Tab } from "neetoui";

import { isNilOrEmpty } from "utils/common";

import { MEDIA_UPLOAD_OPTIONS } from "./constants";
import LocalUploader from "./LocalUploader";
import MediaEditor from "./MediaEditor";
import UnsplashImagePicker from "./UnsplashImagePicker";
import URLForm from "./URLForm";

const MediaUploader = ({
  mediaUploader,
  onClose,
  editor,
  uploadEndpoint,
  unsplashApiKey,
}) => {
  const [activeTab, setActiveTab] = useState("local");
  const [mediaUrl, setMediaUrl] = useState("");
  const isOpen = mediaUploader.image || mediaUploader.video;

  let tabs = unsplashApiKey
    ? MEDIA_UPLOAD_OPTIONS
    : MEDIA_UPLOAD_OPTIONS.slice(0, 2);
  if (mediaUploader.video) tabs = [];

  const handleClose = () => {
    onClose();
    setMediaUrl("");
    setActiveTab("local");
  };

  return (
    <Modal closeButton={false} isOpen={isOpen} onClose={handleClose}>
      <div className="ne-media-uploader">
        {!isNilOrEmpty(tabs) && (
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
        )}
        <div className="ne-media-uploader__content">
          {mediaUrl ? (
            <MediaEditor
              editor={editor}
              isImage={mediaUploader.image}
              url={mediaUrl}
              onClose={handleClose}
            />
          ) : (
            <>
              {activeTab === "local" && (
                <LocalUploader
                  endpoint={uploadEndpoint}
                  isImage={mediaUploader.image}
                  onSuccess={setMediaUrl}
                />
              )}
              {activeTab === "link" && (
                <URLForm
                  placeholder="Paste the link here..."
                  buttonLabel={
                    mediaUploader.image ? "Upload image" : "Upload video"
                  }
                  onSubmit={setMediaUrl}
                />
              )}
              {activeTab === "unsplash" && (
                <UnsplashImagePicker
                  unsplashApiKey={unsplashApiKey}
                  onSubmit={setMediaUrl}
                />
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MediaUploader;
