import React, { useState } from "react";

import classnames from "classnames";

import { DIRECT_UPLOAD_ENDPOINT } from "common/constants";

import { DEFAULT_EDITOR_OPTIONS } from "../constants";
import BubbleMenu from "../CustomExtensions/BubbleMenu";
import FixedMenu from "../CustomExtensions/FixedMenu";
import MediaUploader from "../MediaUploader";

const Menu = ({
  editor,
  menuType = "fixed",
  defaults = DEFAULT_EDITOR_OPTIONS,
  addons = [],
  editorSecrets = {},
  uploadEndpoint = DIRECT_UPLOAD_ENDPOINT,
  mentions = [],
  variables = [],
  addonCommands = [],
  isIndependant = true,
  className,
}) => {
  const [mediaUploader, setMediaUploader] = useState({
    image: false,
    video: false,
  });
  const options = [...defaults, ...addons];
  const isFixedMenuActive = menuType === "fixed";
  const isBubbleMenuActive = menuType === "bubble";

  return (
    <>
      {isFixedMenuActive && (
        <FixedMenu
          addonCommands={addonCommands}
          className={classnames({ [className]: className })}
          editor={editor}
          isIndependant={isIndependant}
          mentions={mentions}
          options={options}
          setMediaUploader={setMediaUploader}
          variables={variables}
        />
      )}
      {isBubbleMenuActive && (
        <BubbleMenu
          editor={editor}
          mentions={mentions}
          options={options}
          setMediaUploader={setMediaUploader}
        />
      )}
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
