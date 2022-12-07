import React, { useState } from "react";

import classnames from "classnames";

import { DIRECT_UPLOAD_ENDPOINT } from "common/constants";

import { DEFAULT_EDITOR_OPTIONS } from "../constants";
import BubbleMenu from "../CustomExtensions/BubbleMenu";
import FixedMenu from "../CustomExtensions/FixedMenu";
import ImageUploader from "../CustomExtensions/Image/Uploader";

const Menu = ({
  editor,
  menuType = "fixed",
  defaults = DEFAULT_EDITOR_OPTIONS,
  addons = [],
  editorSecrets = {},
  uploadEndpoint = DIRECT_UPLOAD_ENDPOINT,
  uploadConfig = {},
  mentions = [],
  variables = [],
  addonCommands = [],
  isIndependant = true,
  className,
}) => {
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
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
          setIsImageUploadOpen={setIsImageUploadOpen}
          variables={variables}
        />
      )}
      {isBubbleMenuActive && (
        <BubbleMenu editor={editor} mentions={mentions} options={options} />
      )}
      <ImageUploader
        editor={editor}
        imageUploadUrl={uploadEndpoint}
        isOpen={isImageUploadOpen}
        unsplashApiKey={editorSecrets.unsplash}
        uploadConfig={uploadConfig}
        onClose={() => setIsImageUploadOpen(false)}
      />
    </>
  );
};

export default Menu;
