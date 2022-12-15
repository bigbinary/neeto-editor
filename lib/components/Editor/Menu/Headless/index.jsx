import React from "react";

import Option from "./Option";
import { buildMenuOptions } from "./utils";

import { buildOptionsFromAddonCommands } from "../Fixed/utils";

const Headless = ({
  editor,
  options,
  setMediaUploader,
  addonCommands = [],
  children,
}) => {
  if (!editor) {
    return null;
  }

  const menuOptions = buildMenuOptions({ editor, options, setMediaUploader });
  const addonCommandOptions = buildOptionsFromAddonCommands({
    editor,
    commands: addonCommands,
  });
  const allOptions = [...menuOptions, ...addonCommandOptions];

  return (
    <div className="ne-headless">
      {allOptions.map(option => (
        <Option editor={editor} key={option.optionName} {...option} />
      ))}
      {children}
    </div>
  );
};

export default Headless;
