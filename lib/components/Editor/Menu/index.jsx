import React, { useState } from "react";

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
}) => {
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
  const options = [...defaults, ...addons];
  const isFixedMenuActive = menuType === "fixed";
  const isBubbleMenuActive = menuType === "bubble";

  return (
    <>
      {isFixedMenuActive && (
        <FixedMenu
          editor={editor}
          isImageUploadOpen={isImageUploadOpen}
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
