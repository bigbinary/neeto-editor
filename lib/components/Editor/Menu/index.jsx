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
    const handleKeyDown = e => {
      if ((e.metaKey || e.ctrlKey) && e.altKey) {
        if (e.code === "KeyE") {
          setIsEmojiPickerActive(prevState => !prevState);
        } else if (e.code === "KeyA") {
          handleUploadAttachments();
        } else if (e.code === "KeyK") {
          setMediaUploader(assoc("image", true));
        } else if (e.code === "KeyV") {
          setMediaUploader(assoc("video", true));
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
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
