import React from "react";

import { fromPairs } from "ramda";

import MenuButton from "components/Common/MenuButton";
import { humanize } from "utils/common";

import { MENU_OPTIONS } from "./constants";

export const buildMenuOptions = ({ editor, options, setIsImageUploadOpen }) => {
  const menuOptions = MENU_OPTIONS(editor, setIsImageUploadOpen);

  return fromPairs(
    ["font", "block", "list", "misc", "right"].map(option => [
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
  disabled,
}) => (
  <MenuButton
    data-cy={`neeto-editor-fixed-menu-${optionName}-option`}
    disabled={disabled}
    highlight={highlight}
    icon={Icon}
    iconActive={active}
    key={optionName}
    tooltipProps={{
      content: humanize(optionName),
      position: "bottom",
      delay: [500],
    }}
    onClick={command}
  />
);

export const buildOptionsFromAddonCommands = ({ editor, commands }) => {
  const { to } = editor.state.selection;

  return commands.map(option => ({
    ...option,
    active: option.active?.({ editor }),
    command: () => option.command?.({ editor, range: { from: to, to } }),
  }));
};
