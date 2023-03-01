import React from "react";

import classnames from "classnames";

import Option from "./Option";
import { buildMenuOptions } from "./utils";

import { buildOptionsFromAddonCommands } from "../Fixed/utils";

const Headless = ({
  editor,
  options,
  tooltips = {},
  setMediaUploader,
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
    </div>
  );
};

export default Headless;