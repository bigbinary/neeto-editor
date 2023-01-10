import React from "react";

import classnames from "classnames";

import Option from "./Option";
import { buildMenuOptions } from "./utils";

import { buildOptionsFromAddonCommands } from "../Fixed/utils";

const Headless = ({
  editor,
  options,
  setMediaUploader,
  addonCommands = [],
  children,
  className,
  onClickAttachment,
}) => {
  if (!editor) {
    return null;
  }

  const menuOptions = buildMenuOptions({
    editor,
    options,
    setMediaUploader,
    onClickAttachment,
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
