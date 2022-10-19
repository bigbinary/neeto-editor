import React from "react";

import { CenterAlign, LeftAlign, RightAlign, Edit, Close } from "neetoicons";

import MenuButton from "components/Common/MenuButton";
import { capitalize } from "utils/common";

export const getTextMenuDropdownOptions = ({ editor }) => [
  {
    optionName: "Heading 1",
    active: editor.isActive("heading", { level: 1 }),
    command: () =>
      editor.chain().focus().setNode("heading", { level: 1 }).run(),
  },
  {
    optionName: "Heading 2",
    active: editor.isActive("heading", { level: 2 }),
    command: () =>
      editor.chain().focus().setNode("heading", { level: 2 }).run(),
  },
  {
    optionName: "Heading 3",
    active: editor.isActive("heading", { level: 3 }),
    command: () =>
      editor.chain().focus().setNode("heading", { level: 3 }).run(),
  },
  {
    optionName: "Ordered List",
    active: editor.isActive("orderedList"),
    command: () => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    optionName: "Bulleted List",
    active: editor.isActive("bulletList"),
    command: () => editor.chain().focus().toggleBulletList().run(),
  },
  {
    optionName: "Text",
    active: editor.isActive("paragraph"),
    command: () => editor.chain().focus().setNode("paragraph").run(),
  },
];

export const getImageMenuOptions = ({
  editor,
  isImageEditorModalOpen,
  setIsImageEditorModalOpen,
}) => [
  {
    Icon: LeftAlign,
    command: () =>
      editor
        .chain()
        .focus()
        .setImageAttributes({
          float: "left",
          align: "none",
        })
        .run(),
    active: editor.isActive("image", {
      float: "left",
      align: "none",
    }),
    optionName: "Float Left",
  },
  {
    Icon: CenterAlign,
    command: () =>
      editor
        .chain()
        .focus()
        .setImageAttributes({
          float: "none",
          align: "center",
        })
        .run(),
    active: editor.isActive("image", {
      float: "none",
      align: "center",
    }),
    optionName: "Align Center",
  },
  {
    Icon: RightAlign,
    command: () =>
      editor
        .chain()
        .focus()
        .setImageAttributes({
          float: "right",
          align: "none",
        })
        .run(),
    active: editor.isActive("image", {
      float: "right",
      align: "center",
    }),
    optionName: "Float Right",
  },
  {
    Icon: Edit,
    command: () => setIsImageEditorModalOpen(true),
    active: isImageEditorModalOpen,
    optionName: "Caption",
  },
  {
    Icon: Close,
    command: () => editor.commands.deleteSelection(),
    active: false,
    optionName: "Remove",
  },
];

export const getNodeType = options =>
  options.find(option => option.active)?.optionName || "Text";

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
    color="white"
    tooltipProps={{
      content: capitalize(optionName),
      position: "bottom",
      theme: "dark",
      delay: [500],
    }}
    data-cy={`neeto-editor-bubble-menu-${optionName}-option`}
  />
);
