import React from "react";

import { t } from "i18next";
import {
  TextBold,
  TextItalic,
  Underline,
  TextCross,
  Highlight,
  Code,
  ListDot,
  ListNumber,
  ImageUpload,
  Quote,
  Undo,
  Redo,
  MediaVideo,
  Video,
  CodeBlock,
  Attachment,
  Link,
} from "neetoicons";
import { Button } from "neetoui";
import { fromPairs, not, assoc } from "ramda";

import { generateFocusProps } from "utils/focusHighlighter";

export const tableActions = ({ editor }) => [
  {
    label: t("neetoEditor.table.insertRow"),
    command: () => editor.commands.addRowAfter(),
  },
  {
    label: t("neetoEditor.table.insertColumn"),
    command: () => editor.commands.addColumnAfter(),
  },
  {
    label: t("neetoEditor.table.deleteRow"),
    command: () => editor.chain().focus().deleteRow().run(),
  },
  {
    label: t("neetoEditor.table.deleteColumn"),
    command: () => editor.chain().focus().deleteColumn().run(),
  },
  {
    label: t("neetoEditor.table.mergeSplit"),
    command: () => editor.chain().focus().mergeOrSplit().run(),
  },
  {
    label: t("neetoEditor.table.toggleHeaderRow"),
    command: () => editor.chain().focus().toggleHeaderRow().run(),
  },
  {
    label: t("neetoEditor.table.toggleHeaderColumn"),
    command: () => editor.chain().focus().toggleHeaderColumn().run(),
  },
  {
    label: t("neetoEditor.table.delete"),
    command: () => editor.commands.deleteTable(),
  },
];

export const createMenuOptions = ({
  tooltips,
  editor,
  setMediaUploader,
  handleUploadAttachments,
  setIsEmbedModalOpen,
  setIsAddLinkActive,
}) => ({
  font: [
    {
      Icon: TextBold,
      command: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      optionName: "bold",
      tooltip: tooltips.bold || t("neetoEditor.menu.bold"),
    },
    {
      Icon: TextItalic,
      command: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      optionName: "italic",
      tooltip: tooltips.italic || t("neetoEditor.menu.italic"),
    },
    {
      Icon: Underline,
      command: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
      optionName: "underline",
      tooltip: tooltips.underline || t("neetoEditor.menu.underline"),
    },
    {
      Icon: TextCross,
      command: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
      optionName: "strike",
      tooltip: tooltips.strike || t("neetoEditor.menu.strike"),
    },
    {
      Icon: Highlight,
      command: () => editor.chain().focus().toggleHighlight().run(),
      active: editor.isActive("highlight"),
      optionName: "highlight",
      tooltip: tooltips.highlight || t("neetoEditor.menu.highlight"),
    },
  ],
  block: [
    {
      Icon: Quote,
      command: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive("blockquote"),
      optionName: "block-quote",
      highlight: true,
      tooltip: tooltips.blockQuote || t("neetoEditor.menu.blockQuote"),
    },
    {
      Icon: Code,
      command: () => editor.chain().focus().toggleCode().run(),
      active: editor.isActive("code"),
      optionName: "code",
      tooltip: tooltips.code || t("neetoEditor.menu.code"),
    },
    {
      Icon: CodeBlock,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      active: editor.isActive("codeBlock"),
      optionName: "code-block",
      tooltip: tooltips.codeBlock || t("neetoEditor.menu.codeBlock"),
    },
  ],
  list: [
    {
      Icon: ListDot,
      command: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
      optionName: "bullet-list",
      highlight: true,
      tooltip: tooltips.bulletList || t("neetoEditor.menu.bulletedList"),
    },
    {
      Icon: ListNumber,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      optionName: "ordered-list",
      highlight: true,
      tooltip: tooltips.orderedList || t("neetoEditor.menu.orderedList"),
    },
  ],
  misc: [
    {
      Icon: Link,
      command: () => setIsAddLinkActive(not),
      optionName: "link",
      tooltip: "Link",
    },
    {
      Icon: Attachment,
      command: handleUploadAttachments,
      active: false,
      optionName: "attachments",
      tooltip: tooltips.attachments || t("neetoEditor.menu.attachments"),
    },
    {
      Icon: ImageUpload,
      command: () => setMediaUploader(assoc("image", true)),
      optionName: "image-upload",
      tooltip: tooltips.imageUpload || t("neetoEditor.menu.imageUpload"),
    },
    {
      Icon: Video,
      command: () => setMediaUploader(assoc("video", true)),
      optionName: "video-upload",
      tooltip: tooltips.videoUpload || t("neetoEditor.menu.videoUpload"),
    },
    {
      Icon: MediaVideo,
      command: () => setIsEmbedModalOpen(true),
      optionName: "video-embed",
      tooltip: tooltips.videoEmbed || t("neetoEditor.menu.videoEmbed"),
    },
  ],
  right: [
    {
      Icon: Undo,
      command: () => editor.chain().focus().undo().run(),
      active: false,
      disabled: !editor.can().undo(),
      optionName: "undo",
      tooltip: tooltips.undo || t("neetoEditor.menu.undo"),
    },
    {
      Icon: Redo,
      command: () => editor.chain().focus().redo().run(),
      active: false,
      disabled: !editor.can().redo(),
      optionName: "redo",
      tooltip: tooltips.redo || t("neetoEditor.menu.redo"),
    },
  ],
});

export const buildMenuOptions = ({
  tooltips,
  editor,
  options,
  setMediaUploader,
  handleUploadAttachments,
  setIsEmbedModalOpen,
  setIsAddLinkActive,
}) => {
  const menuOptions = createMenuOptions({
    tooltips,
    editor,
    setMediaUploader,
    handleUploadAttachments,
    setIsEmbedModalOpen,
    setIsAddLinkActive,
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
    {...{ disabled }}
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
