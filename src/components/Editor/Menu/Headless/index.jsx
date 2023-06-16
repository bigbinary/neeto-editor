import React from "react";

import classnames from "classnames";

import { EDITOR_OPTIONS } from "common/constants";
import MediaUploader from "components/Editor/MediaUploader";

import Option from "./Option";
import { buildMenuOptions } from "./utils";

import { buildOptionsFromAddonCommands } from "../Fixed/utils";

const Headless = ({
  editor,
  options,
  tooltips = {},
  setMediaUploader,
  mediaUploader,
  unsplashApiKey,
  uploadEndpoint,
  addonCommands = [],
  children,
  className,
  handleUploadAttachments,
  isEmojiPickerActive,
  setIsEmojiPickerActive,
  setIsEmbedModalOpen,
}) => {
  if (!editor) {
    return null;
  }

  const isMediaUploaderActive = options.includes(
    EDITOR_OPTIONS.IMAGE_UPLOAD || EDITOR_OPTIONS.VIDEO_UPLOAD
  );

  const menuOptions = buildMenuOptions({
    tooltips,
    editor,
    options,
    setMediaUploader,
    handleUploadAttachments,
    isEmojiPickerActive,
    setIsEmojiPickerActive,
    setIsEmbedModalOpen,
  });

  const addonCommandOptions = buildOptionsFromAddonCommands({
    editor,
    commands: addonCommands,
  });
  const allOptions = [...menuOptions, ...addonCommandOptions];

  return (
    <div className={classnames("ne-headless", { [className]: className })}>
      {allOptions.map(option => (
        <Option editor={editor} key={option.optionName} {...option} />
      ))}
      {children}
      {isMediaUploaderActive && (
        <MediaUploader
          editor={editor}
          mediaUploader={mediaUploader}
          unsplashApiKey={unsplashApiKey}
          uploadEndpoint={uploadEndpoint}
          onClose={() => setMediaUploader({ image: false, video: false })}
        />
      )}
    </div>
  );
};

export default Headless;
