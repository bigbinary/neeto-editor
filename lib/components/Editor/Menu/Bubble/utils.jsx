import React from "react";

import {
  Code,
  Highlight,
  Link,
  TextBold,
  TextCross,
  TextItalic,
  Underline,
} from "neetoicons";
import { Button } from "neetoui";
import { prop } from "ramda";

import { humanize } from "neetocommons/pure";
import { generateFocusProps } from "utils/focusHighlighter";

export const getTextMenuDefaultOptions = ({
  editor,
  setIsLinkOptionActive,
}) => [
  {
    Icon: TextBold,
    command: () => editor.chain().focus().toggleBold().run(),
    active: editor.isActive("bold"),
    optionName: "bold",
  },
  {
    Icon: TextItalic,
    command: () => editor.chain().focus().toggleItalic().run(),
    active: editor.isActive("italic"),
    optionName: "italic",
  },
  {
    Icon: Underline,
    command: () => editor.chain().focus().toggleUnderline().run(),
    active: editor.isActive("underline"),
    optionName: "underline",
  },
  {
    Icon: TextCross,
    command: () => editor.chain().focus().toggleStrike().run(),
    active: editor.isActive("strike"),
    optionName: "strike",
  },
  {
    Icon: Link,
    command: () => setIsLinkOptionActive(true),
    active: editor.isActive("link"),
    optionName: "link",
  },
  {
    Icon: Code,
    command: () => editor.chain().focus().toggleCode().run(),
    active: editor.isActive("code"),
    optionName: "code",
  },
  {
    Icon: Highlight,
    command: () => editor.chain().focus().toggleHighlight().run(),
    active: editor.isActive("highlight"),
    optionName: "highlight",
  },
];

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

export const getNodeType = options =>
  options.find(prop("active"))?.optionName || "Text";

export const renderOptionButton = ({
  Icon,
  command,
  active,
  optionName,
  highlight,
}) => (
  <Button
    data-cy={`neeto-editor-bubble-menu-${optionName}-option`}
    icon={Icon}
    key={optionName}
    style={active ? "secondary" : "text"}
    tooltipProps={{
      content: humanize(optionName),
      position: "bottom",
      theme: "dark",
      delay: [500],
    }}
    onClick={command}
    {...generateFocusProps(highlight)}
  />
);
