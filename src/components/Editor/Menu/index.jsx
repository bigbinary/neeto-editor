import React, { useEffect, useState } from "react";

import { noop } from "neetocommons/pure";
import { assoc, isEmpty } from "ramda";

import BubbleMenu from "./Bubble";
import FixedMenu from "./Fixed";
import HeadlessMenu from "./Headless";

import { DEFAULT_EDITOR_OPTIONS } from "../constants";

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
    editorSecrets = {},
    handleUploadAttachments = noop,
    defaults = DEFAULT_EDITOR_OPTIONS,
  } = props;

  const menuComponent = {
    fixed: FixedMenu,
    bubble: BubbleMenu,
    headless: HeadlessMenu,
    none: () => <div />,
  };

  const MenuComponent = menuComponent[menuType];
  const menuOptions = isEmpty(options) ? [...defaults, ...addons] : options;

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
    if (menuType !== "none") {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <MenuComponent
      {...props}
      handleUploadAttachments={handleUploadAttachments}
      isEmojiPickerActive={isEmojiPickerActive}
      mediaUploader={mediaUploader}
      options={menuOptions}
      setIsEmojiPickerActive={setIsEmojiPickerActive}
      setMediaUploader={setMediaUploader}
      unsplashApiKey={editorSecrets.unsplash}
    />
  );
};

export default Menu;
