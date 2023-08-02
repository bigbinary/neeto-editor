import React from "react";

import { Button } from "neetoui";
import { fromPairs } from "ramda";

import { generateFocusProps } from "utils/focusHighlighter";

import { MENU_OPTIONS } from "./constants";

export const buildMenuOptions = ({
  tooltips,
  editor,
  options,
  setMediaUploader,
  handleUploadAttachments,
  setIsEmbedModalOpen,
}) => {
  const menuOptions = MENU_OPTIONS({
    tooltips,
    editor,
    setMediaUploader,
    handleUploadAttachments,
    setIsEmbedModalOpen,
  });

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
  tooltip,
}) => (
  <Button
    className="neeto-editor-fixed-menu__item"
    data-cy={`neeto-editor-fixed-menu-${optionName}-option`}
    disabled={disabled}
    icon={Icon}
    key={optionName}
    style={active ? "secondary" : "text"}
    tabIndex="-1"
    tooltipProps={{ content: tooltip, position: "bottom" }}
    onClick={command}
    {...generateFocusProps(highlight)}
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
