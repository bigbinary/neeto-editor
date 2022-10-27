import React from "react";

import { fromPairs } from "ramda";

import MenuButton from "components/Common/MenuButton";
import { humanize } from "utils/common";

import { MENU_OPTIONS } from "./constants";

export const buildMenuOptions = ({
  editor,
  options,
  setIsImageUploadVisible,
}) => {
  const menuOptions = MENU_OPTIONS(editor, setIsImageUploadVisible);

  return fromPairs(
    ["font", "block", "list", "misc"].map(option => [
      option,
      menuOptions[option].filter(item => options.includes(item.optionName)),
    ])
  );
};

export const renderOptionButton = ({
  Icon,
  command,
  active,
  optionName,
  highlight,
}) => (
  <MenuButton
    key={optionName}
    icon={Icon}
    iconActive={active}
    highlight={highlight}
    onClick={command}
    tooltipProps={{
      content: humanize(optionName),
      position: "bottom",
      delay: [500],
    }}
    data-cy={`neeto-editor-fixed-menu-${optionName}-option`}
  />
);
