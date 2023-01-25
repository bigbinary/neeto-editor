import React, { useEffect, useState } from "react";

import { assoc, isEmpty } from "ramda";

import { DIRECT_UPLOAD_ENDPOINT } from "common/constants";

import BubbleMenu from "./Bubble";
import FixedMenu from "./Fixed";
import HeadlessMenu from "./Headless";

import { DEFAULT_EDITOR_OPTIONS } from "../constants";
import MediaUploader from "../MediaUploader";

const Menu = props => {
  const [isEmojiPickerActive, setIsEmojiPickerActive] = useState(false);
  const [mediaUploader, setMediaUploader] = useState({
    image: false,
    video: false,
  });

  const {
    menuType = "fixed",
    addons = [],
    options = [],
    editor,
    uploadEndpoint = DIRECT_UPLOAD_ENDPOINT,
    editorSecrets = {},
    handleUploadAttachments,
  } = props;

  const menuComponent = {
    fixed: FixedMenu,
    bubble: BubbleMenu,
    headless: HeadlessMenu,
    none: () => <div />,
  };

  const MenuComponent = menuComponent[menuType];
  const menuOptions = isEmpty(options)
    ? [...DEFAULT_EDITOR_OPTIONS, ...addons]
    : options;

  useEffect(() => {
    document.addEventListener("keydown", e => {
      if (e.metaKey && e.altKey && e.code === "KeyE") {
        setIsEmojiPickerActive(prevState => !prevState);
      }

      if (e.metaKey && e.altKey && e.code === "KeyA") {
        handleUploadAttachments();
      }

      if (e.metaKey && e.altKey && e.code === "KeyK") {
        setMediaUploader(assoc("image", true));
      }

      if (e.metaKey && e.altKey && e.code === "KeyV") {
        setMediaUploader(assoc("video", true));
      }
    });
  }, []);

  return (
    <>
      <MenuComponent
        {...props}
        handleUploadAttachments={handleUploadAttachments}
        isEmojiPickerActive={isEmojiPickerActive}
        options={menuOptions}
        setIsEmojiPickerActive={setIsEmojiPickerActive}
        setMediaUploader={setMediaUploader}
      />
      <MediaUploader
        editor={editor}
        mediaUploader={mediaUploader}
        unsplashApiKey={editorSecrets.unsplash}
        uploadEndpoint={uploadEndpoint}
        onClose={() => setMediaUploader({ image: false, video: false })}
      />
    </>
  );
};

export default Menu;
