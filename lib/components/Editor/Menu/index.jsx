import React, { useState } from "react";

import { DIRECT_UPLOAD_ENDPOINT } from "common/constants";

import { DEFAULT_EDITOR_OPTIONS } from "../constants";
import BubbleMenu from "../CustomExtensions/BubbleMenu";
import FixedMenu from "../CustomExtensions/FixedMenu";
import MediaUploader from "../MediaUploader";

const Menu = props => {
  const [mediaUploader, setMediaUploader] = useState({
    image: false,
    video: false,
  });

  const {
    menuType = "fixed",
    defaults = DEFAULT_EDITOR_OPTIONS,
    addons = [],
    editor,
    uploadEndpoint = DIRECT_UPLOAD_ENDPOINT,
    editorSecrets = {},
  } = props;

  const menuComponent = {
    fixed: FixedMenu,
    bubble: BubbleMenu,
    headless: () => <div />,
    none: () => <div />,
  };

  const MenuComponent = menuComponent[menuType];

  return (
    <>
      <MenuComponent
        {...props}
        options={[...defaults, ...addons]}
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
