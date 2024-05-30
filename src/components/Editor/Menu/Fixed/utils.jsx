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
import { prop, not, assoc } from "ramda";

import { EDITOR_OPTIONS } from "src/common/constants";
import { generateFocusProps } from "utils/focusHighlighter";

import { MENU_ELEMENT_TYPES } from "./constants";

export const createMenuOptions = ({
  tooltips,
  editor,
  setMediaUploader,
  attachmentProps,
  setIsEmbedModalOpen,
  setIsAddLinkActive,
  options,
  mentions,
  addonCommandOptions,
  setIsEmojiPickerActive,
  isEmojiPickerActive,
}) => {
  const fontSizeOptions = options.filter(option => option.match(/^h[1-6]$/));

  return [
    // history
    [
      {
        icon: Undo,
        command: editor.chain().focus().undo().run,
        isEnabled: options.includes(EDITOR_OPTIONS.UNDO),
        active: false,
        disabled: !editor.can().undo(),
        optionName: EDITOR_OPTIONS.UNDO,
        label: tooltips.undo ?? t("neetoEditor.menu.undo"),
        type: MENU_ELEMENT_TYPES.BUTTON,
      },
      {
        icon: Redo,
        command: editor.chain().focus().redo().run,
        isEnabled: options.includes(EDITOR_OPTIONS.REDO),
        active: false,
        disabled: !editor.can().redo(),
        optionName: EDITOR_OPTIONS.REDO,
        label: tooltips.redo ?? t("neetoEditor.menu.redo"),
        type: MENU_ELEMENT_TYPES.BUTTON,
      },
    ],
    // font
    [
      {
        type: MENU_ELEMENT_TYPES.FONT_SIZE,
        options: fontSizeOptions,
        label: tooltips.fontSize ?? t("neetoEditor.menu.fontSize"),
        isEnabled: isNotEmpty(fontSizeOptions),
        optionName: "fontSizeOptions",
      },
      {
        type: MENU_ELEMENT_TYPES.BUTTON,
        icon: TextBold,
        isEnabled: options.includes(EDITOR_OPTIONS.BOLD),
        command: editor.chain().focus().toggleBold().run,
        active: editor.isActive(EDITOR_OPTIONS.BOLD),
        optionName: EDITOR_OPTIONS.BOLD,
        label: tooltips.bold ?? t("neetoEditor.menu.bold"),
      },
      {
        type: MENU_ELEMENT_TYPES.BUTTON,
        icon: TextItalic,
        isEnabled: options.includes(EDITOR_OPTIONS.ITALIC),
        command: editor.chain().focus().toggleItalic().run,
        active: editor.isActive(EDITOR_OPTIONS.ITALIC),
        optionName: EDITOR_OPTIONS.ITALIC,
        label: tooltips.italic ?? t("neetoEditor.menu.italic"),
      },
      {
        type: MENU_ELEMENT_TYPES.BUTTON,
        icon: Underline,
        isEnabled: options.includes(EDITOR_OPTIONS.UNDERLINE),
        command: editor.chain().focus().toggleUnderline().run,
        active: editor.isActive(EDITOR_OPTIONS.UNDERLINE),
        optionName: EDITOR_OPTIONS.UNDERLINE,
        label: tooltips.underline ?? t("neetoEditor.menu.underline"),
      },
      {
        type: MENU_ELEMENT_TYPES.BUTTON,
        icon: Link,
        isEnabled: options.includes(EDITOR_OPTIONS.LINK),
        active: false,
        command: () => setIsAddLinkActive(not),
        optionName: EDITOR_OPTIONS.LINK,
        label: tooltips.link ?? t("neetoEditor.menu.link"),
      },
      {
        type: MENU_ELEMENT_TYPES.BUTTON,
        icon: TextCross,
        isEnabled: options.includes(EDITOR_OPTIONS.STRIKETHROUGH),
        command: editor.chain().focus().toggleStrike().run,
        active: editor.isActive(EDITOR_OPTIONS.STRIKETHROUGH),
        optionName: EDITOR_OPTIONS.STRIKETHROUGH,
        label: tooltips.strike ?? t("neetoEditor.menu.strike"),
      },
      {
        type: MENU_ELEMENT_TYPES.BUTTON,
        icon: Highlight,
        isEnabled: options.includes(EDITOR_OPTIONS.HIGHLIGHT),
        command: editor.chain().focus().toggleHighlight().run,
        active: editor.isActive(EDITOR_OPTIONS.HIGHLIGHT),
        optionName: EDITOR_OPTIONS.HIGHLIGHT,
        label: tooltips.highlight ?? t("neetoEditor.menu.highlight"),
      },
    ],
    // list
    [
      {
        type: MENU_ELEMENT_TYPES.BUTTON,
        icon: ListDot,
        command: editor.chain().focus().toggleBulletList().run,
        active: editor.isActive("bulletList"),
        isEnabled: options.includes(EDITOR_OPTIONS.LIST_BULLETS),
        optionName: EDITOR_OPTIONS.LIST_BULLETS,
        highlight: true,
        label: tooltips.bulletList ?? t("neetoEditor.menu.bulletedList"),
      },
      {
        type: MENU_ELEMENT_TYPES.BUTTON,
        icon: ListNumber,
        command: editor.chain().focus().toggleOrderedList().run,
        active: editor.isActive("orderedList"),
        isEnabled: options.includes(EDITOR_OPTIONS.LIST_ORDERED),
        optionName: EDITOR_OPTIONS.LIST_ORDERED,
        highlight: true,
        label: tooltips.orderedList ?? t("neetoEditor.menu.orderedList"),
      },
    ],
    // block
    [
      {
        type: MENU_ELEMENT_TYPES.BUTTON,
        icon: Quote,
        command: editor.chain().focus().toggleBlockquote().run,
        active: editor.isActive("blockquote"),
        isEnabled: options.includes(EDITOR_OPTIONS.BLOCKQUOTE),
        optionName: EDITOR_OPTIONS.BLOCKQUOTE,
        highlight: true,
        label: tooltips.blockQuote ?? t("neetoEditor.menu.blockQuote"),
      },
      {
        type: MENU_ELEMENT_TYPES.BUTTON,
        icon: Code,
        command: editor.chain().focus().toggleCode().run,
        active: editor.isActive(EDITOR_OPTIONS.CODE),
        isEnabled: options.includes(EDITOR_OPTIONS.CODE),
        optionName: EDITOR_OPTIONS.CODE,
        label: tooltips.code ?? t("neetoEditor.menu.code"),
      },
      {
        type: MENU_ELEMENT_TYPES.BUTTON,
        icon: CodeBlock,
        command: editor.chain().focus().toggleCodeBlock().run,
        active: editor.isActive("codeBlock"),
        isEnabled: options.includes(EDITOR_OPTIONS.CODE_BLOCK),
        optionName: EDITOR_OPTIONS.CODE_BLOCK,
        label: tooltips.codeBlock ?? t("neetoEditor.menu.codeBlock"),
      },
    ],
    // misc
    [
      {
        type: MENU_ELEMENT_TYPES.TABLE,
        label: tooltips.table ?? t("neetoEditor.menu.table"),
        isEnabled: options.includes(EDITOR_OPTIONS.TABLE),
        optionName: EDITOR_OPTIONS.TABLE,
      },
      {
        type: MENU_ELEMENT_TYPES.BUTTON,
        icon: Attachment,
        command: attachmentProps?.handleUploadAttachments,
        disabled: attachmentProps?.isDisabled,
        active: false,
        isEnabled: options.includes(EDITOR_OPTIONS.ATTACHMENTS),
        optionName: EDITOR_OPTIONS.ATTACHMENTS,
        label: tooltips.attachments ?? t("neetoEditor.menu.attachments"),
      },
      {
        type: MENU_ELEMENT_TYPES.BUTTON,
        icon: ImageUpload,
        command: () => setMediaUploader(assoc("image", true)),
        isEnabled: options.includes(EDITOR_OPTIONS.IMAGE_UPLOAD),
        optionName: EDITOR_OPTIONS.IMAGE_UPLOAD,
        label: tooltips.imageUpload ?? t("neetoEditor.menu.imageUpload"),
      },
      {
        type: MENU_ELEMENT_TYPES.BUTTON,
        icon: Video,
        command: () => setMediaUploader(assoc("video", true)),
        isEnabled: options.includes(EDITOR_OPTIONS.VIDEO_UPLOAD),
        optionName: EDITOR_OPTIONS.VIDEO_UPLOAD,
        label: tooltips.videoUpload ?? t("neetoEditor.menu.videoUpload"),
      },
      {
        type: MENU_ELEMENT_TYPES.BUTTON,
        icon: MediaVideo,
        command: () => setIsEmbedModalOpen(true),
        isEnabled: options.includes(EDITOR_OPTIONS.VIDEO_EMBED),
        optionName: EDITOR_OPTIONS.VIDEO_EMBED,
        label: tooltips.videoEmbed ?? t("neetoEditor.menu.videoEmbed"),
      },
    ],
    // extras
    [
      {
        type: MENU_ELEMENT_TYPES.TEXT_COLOR,
        label: tooltips.textColor ?? t("neetoEditor.menu.textColor"),
        isEnabled: options.includes(EDITOR_OPTIONS.TEXT_COLOR),
        optionName: EDITOR_OPTIONS.TEXT_COLOR,
      },
      {
        type: MENU_ELEMENT_TYPES.EMOJI,
        label: tooltips.emoji ?? t("neetoEditor.menu.emoji"),
        isEnabled: options.includes(EDITOR_OPTIONS.EMOJI),
        optionName: EDITOR_OPTIONS.EMOJI,
        setActive: setIsEmojiPickerActive,
        isActive: isEmojiPickerActive,
      },
      {
        type: MENU_ELEMENT_TYPES.MENTIONS,
        label: tooltips.mention ?? t("neetoEditor.menu.mention"),
        isEnabled: isNotEmpty(mentions),
        optionName: "mentions",
        mentions,
      },
    ],
    //addons
    [...addonCommandOptions],
  ];
};

export const buildMenuOptions = ({
  tooltips,
  editor,
  options,
  setMediaUploader,
  attachmentProps,
  setIsEmbedModalOpen,
  setIsAddLinkActive,
  mentions,
  addonCommands,
  setIsEmojiPickerActive,
  isEmojiPickerActive,
}) => {
  if (!editor) return [];

  const addonCommandOptions = buildOptionsFromAddonCommands({
    editor,
    commands: addonCommands,
  });

  const menuOptions = createMenuOptions({
    tooltips,
    editor,
    setMediaUploader,
    attachmentProps,
    setIsEmbedModalOpen,
    setIsAddLinkActive,
    options,
    mentions,
    addonCommandOptions,
    setIsEmojiPickerActive,
    isEmojiPickerActive,
  });

  return menuOptions.map(option => option.filter(prop("isEnabled")));
};

export const renderOptionButton = ({
  icon,
  command,
  active,
  optionName,
  highlight,
  disabled,
  tooltip,
}) => (
  <Button
    {...{ disabled, icon }}
    className="neeto-editor-fixed-menu__item"
    data-cy={`neeto-editor-fixed-menu-${optionName}-option`}
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
    type: MENU_ELEMENT_TYPES.BUTTON,
    active: option.active?.({ editor }),
    command: () => option.command?.({ editor, range: { from: to, to } }),
  }));
};

export const getCursorPos = (editor, to) => editor?.view.coordsAtPos(to);
