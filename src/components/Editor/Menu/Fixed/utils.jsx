import React from "react";

import { t } from "i18next";
import { isNotEmpty } from "neetocist";
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

import { EDITOR_OPTIONS } from "src/common/constants";
import { generateFocusProps } from "utils/focusHighlighter";

export const createMenuOptions = ({
  tooltips,
  editor,
  setMediaUploader,
  attachmentProps,
  setIsEmbedModalOpen,
  setIsAddLinkActive,
  options,
}) => {
  const fontSizeOptions = options.filter(option => option.match(/^h[1-6]$/));

  return {
    history: [
      {
        icon: Undo,
        command: editor.chain().focus().undo().run,
        isEnabled: options.includes(EDITOR_OPTIONS.UNDO),
        active: false,
        disabled: !editor.can().undo(),
        optionName: EDITOR_OPTIONS.UNDO,
        label: tooltips.undo ?? t("neetoEditor.menu.undo"),
      },
      {
        icon: Redo,
        command: editor.chain().focus().redo().run,
        isEnabled: options.includes(EDITOR_OPTIONS.REDO),
        active: false,
        disabled: !editor.can().redo(),
        optionName: EDITOR_OPTIONS.REDO,
        label: tooltips.redo ?? t("neetoEditor.menu.redo"),
      },
    ],
    fontSize: [
      {
        type: "fontSize",
        options: fontSizeOptions,
        label: tooltips.fontSize ?? t("neetoEditor.menu.fontSize"),
        isEnabled: isNotEmpty(fontSizeOptions),
      },
    ],
    font: [
      {
        icon: TextBold,
        isEnabled: options.includes(EDITOR_OPTIONS.BOLD),
        command: editor.chain().focus().toggleBold().run,
        active: editor.isActive(EDITOR_OPTIONS.BOLD),
        optionName: EDITOR_OPTIONS.BOLD,
        label: tooltips.bold ?? t("neetoEditor.menu.bold"),
      },
      {
        icon: TextItalic,
        isEnabled: options.includes(EDITOR_OPTIONS.ITALIC),
        command: editor.chain().focus().toggleItalic().run,
        active: editor.isActive(EDITOR_OPTIONS.ITALIC),
        optionName: EDITOR_OPTIONS.ITALIC,
        label: tooltips.italic ?? t("neetoEditor.menu.italic"),
      },
      {
        icon: Underline,
        isEnabled: options.includes(EDITOR_OPTIONS.UNDERLINE),
        command: editor.chain().focus().toggleUnderline().run,
        active: editor.isActive(EDITOR_OPTIONS.UNDERLINE),
        optionName: EDITOR_OPTIONS.UNDERLINE,
        label: tooltips.underline ?? t("neetoEditor.menu.underline"),
      },
      {
        icon: Link,
        isEnabled: options.includes(EDITOR_OPTIONS.LINK),
        active: false,
        command: () => setIsAddLinkActive(not),
        optionName: EDITOR_OPTIONS.LINK,
        tooltip: tooltips.link ?? t("neetoEditor.menu.link"),
      },
      {
        icon: TextCross,
        isEnabled: options.includes(EDITOR_OPTIONS.STRIKETHROUGH),
        command: editor.chain().focus().toggleStrike().run,
        active: editor.isActive(EDITOR_OPTIONS.STRIKETHROUGH),
        optionName: EDITOR_OPTIONS.STRIKETHROUGH,
        tooltip: tooltips.strike ?? t("neetoEditor.menu.strike"),
      },
      {
        icon: Highlight,
        isEnabled: options.includes(EDITOR_OPTIONS.HIGHLIGHT),
        command: editor.chain().focus().toggleHighlight().run,
        active: editor.isActive(EDITOR_OPTIONS.HIGHLIGHT),
        optionName: EDITOR_OPTIONS.HIGHLIGHT,
        tooltip: tooltips.highlight ?? t("neetoEditor.menu.highlight"),
      },
    ],
    list: [
      {
        icon: ListDot,
        command: editor.chain().focus().toggleBulletList().run,
        active: editor.isActive("bulletList"),
        isEnabled: options.includes(EDITOR_OPTIONS.LIST_BULLETS),
        optionName: EDITOR_OPTIONS.LIST_BULLETS,
        highlight: true,
        tooltip: tooltips.bulletList ?? t("neetoEditor.menu.bulletedList"),
      },
      {
        icon: ListNumber,
        command: editor.chain().focus().toggleOrderedList().run,
        active: editor.isActive("orderedList"),
        isEnabled: options.includes(EDITOR_OPTIONS.LIST_ORDERED),
        optionName: EDITOR_OPTIONS.LIST_ORDERED,
        highlight: true,
        tooltip: tooltips.orderedList ?? t("neetoEditor.menu.orderedList"),
      },
    ],
    block: [
      {
        icon: Quote,
        command: editor.chain().focus().toggleBlockquote().run,
        active: editor.isActive("blockquote"),
        isEnabled: options.includes(EDITOR_OPTIONS.BLOCKQUOTE),
        optionName: EDITOR_OPTIONS.BLOCKQUOTE,
        highlight: true,
        tooltip: tooltips.blockQuote ?? t("neetoEditor.menu.blockQuote"),
      },
      {
        icon: Code,
        command: editor.chain().focus().toggleCode().run,
        active: editor.isActive(EDITOR_OPTIONS.CODE),
        isEnabled: options.includes(EDITOR_OPTIONS.CODE),
        optionName: EDITOR_OPTIONS.CODE,
        tooltip: tooltips.code ?? t("neetoEditor.menu.code"),
      },
      {
        icon: CodeBlock,
        command: editor.chain().focus().toggleCodeBlock().run,
        active: editor.isActive("codeBlock"),
        isEnabled: options.includes(EDITOR_OPTIONS.CODE_BLOCK),
        optionName: EDITOR_OPTIONS.CODE_BLOCK,
        tooltip: tooltips.codeBlock ?? t("neetoEditor.menu.codeBlock"),
      },
    ],
    misc: [
      {
        icon: Attachment,
        command: attachmentProps?.handleUploadAttachments,
        disabled: attachmentProps?.isDisabled,
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
  };
};

export const buildMenuOptions = ({
  tooltips,
  editor,
  options,
  setMediaUploader,
  attachmentProps,
  setIsEmbedModalOpen,
  setIsAddLinkActive,
}) => {
  const menuOptions = createMenuOptions({
    tooltips,
    editor,
    setMediaUploader,
    attachmentProps,
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
    {...{ disabled }}
    className="neeto-editor-fixed-menu__item"
    data-cy={`neeto-editor-fixed-menu-${optionName}-option`}
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

export const getCursorPos = (editor, to) => editor?.view.coordsAtPos(to);
