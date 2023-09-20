import React, { useState } from "react";

import { Modal, Tab } from "neetoui";
import { not } from "ramda";
import { useTranslation } from "react-i18next";

import { isNilOrEmpty } from "utils/common";

import { MEDIA_UPLOAD_OPTIONS } from "./constants";
import LocalUploader from "./LocalUploader";
import UnsplashImagePicker from "./UnsplashImagePicker";
import URLForm from "./URLForm";

const MediaUploader = ({ mediaUploader, onClose, editor, unsplashApiKey }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("local");
  const [isUploading, setIsUploading] = useState(false);
  const isOpen = mediaUploader.image || mediaUploader.video;

  let tabs = unsplashApiKey
    ? MEDIA_UPLOAD_OPTIONS
    : MEDIA_UPLOAD_OPTIONS.slice(0, 2);
  if (mediaUploader.video) tabs = [];

  const handleClose = () => {
    onClose();
    setActiveTab("local");
  };

  const handleSubmit = url => {
    insertMediaToEditor({ url });
    handleClose();
  };

  const insertMediaToEditor = file => {
    const { url, filename = "", caption = "" } = file;
    const mediaAttrs = { src: url, caption, alt: filename };
    const setMedia = mediaUploader.image
      ? editor.chain().setFigure(mediaAttrs)
      : editor.chain().setVideo(mediaAttrs);

    setMedia
      .focus()
      .command(({ tr, commands }) => {
        const { doc, selection } = tr;
        const position = doc.resolve(selection.to).end() + 1;

        return commands.insertContentAt(position, "<p></p>");
      })
      .run();
  };

  return (
    <Modal
      closeButton={false}
      {...{ isOpen }}
      closeOnEsc={not(isUploading)}
      closeOnOutsideClick={not(isUploading)}
      onClose={handleClose}
    >
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
          {activeTab === "local" && (
            <LocalUploader
              {...{ insertMediaToEditor, setIsUploading }}
              isImage={mediaUploader.image}
              onClose={handleClose}
            />
          )}
          {activeTab === "link" && (
            <URLForm
              placeholder={t("placeholders.pasteLink")}
              buttonLabel={
                mediaUploader.image ? "Upload image" : "Upload video"
              }
              onSubmit={handleSubmit}
            />
          )}
          {activeTab === "unsplash" && (
            <UnsplashImagePicker
              {...{ unsplashApiKey }}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MediaUploader;
