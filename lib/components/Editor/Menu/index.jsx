import React, { useState } from "react";

import { isEmpty } from "ramda";

import { DIRECT_UPLOAD_ENDPOINT } from "common/constants";

import BubbleMenu from "./Bubble";
import FixedMenu from "./Fixed";
import HeadlessMenu from "./Headless";

import { DEFAULT_EDITOR_OPTIONS } from "../constants";
import MediaUploader from "../MediaUploader";

const Menu = props => {
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

  return (
    <>
      <MenuComponent
        {...props}
        options={menuOptions}
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
