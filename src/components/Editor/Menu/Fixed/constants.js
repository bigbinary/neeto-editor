import i18n from "i18next";
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
} from "neetoicons";
import { assoc } from "ramda";

import { FileAttachments } from "src/icons/FileAttachments";

const { t } = i18n;

export const MENU_OPTIONS = ({
  tooltips,
  editor,
  setMediaUploader,
  handleUploadAttachments,
  setIsEmbedModalOpen,
}) => ({
  font: [
    {
      Icon: TextBold,
      command: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      optionName: "bold",
      tooltip: tooltips.bold || t("menu.bold"),
    },
    {
      Icon: TextItalic,
      command: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      optionName: "italic",
      tooltip: tooltips.italic || t("menu.italic"),
    },
    {
      Icon: Underline,
      command: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
      optionName: "underline",
      tooltip: tooltips.underline || t("menu.underline"),
    },
    {
      Icon: TextCross,
      command: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
      optionName: "strike",
      tooltip: tooltips.strike || t("menu.strike"),
    },
    {
      Icon: Highlight,
      command: () => editor.chain().focus().toggleHighlight().run(),
      active: editor.isActive("highlight"),
      optionName: "highlight",
      tooltip: tooltips.highlight || t("menu.highlight"),
    },
  ],
  block: [
    {
      Icon: Quote,
      command: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive("blockquote"),
      optionName: "block-quote",
      highlight: true,
      tooltip: tooltips.blockQuote || t("menu.blockQuote"),
    },
    {
      Icon: Code,
      command: () => editor.chain().focus().toggleCode().run(),
      active: editor.isActive("code"),
      optionName: "code",
      tooltip: tooltips.code || t("menu.code"),
    },
    {
      Icon: CodeBlock,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      active: editor.isActive("codeBlock"),
      optionName: "code-block",
      tooltip: tooltips.codeBlock || t("menu.codeBlock"),
    },
  ],
  list: [
    {
      Icon: ListDot,
      command: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
      optionName: "bullet-list",
      highlight: true,
      tooltip: tooltips.bulletList || t("menu.bulletedList"),
    },
    {
      Icon: ListNumber,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      optionName: "ordered-list",
      highlight: true,
      tooltip: tooltips.orderedList || t("menu.orderedList"),
    },
  ],
  misc: [
    {
      Icon: FileAttachments,
      command: handleUploadAttachments,
      active: false,
      optionName: "attachments",
      tooltip: tooltips.attachments || t("menu.attachments"),
    },
    {
      Icon: ImageUpload,
      command: () => setMediaUploader(assoc("image", true)),
      optionName: "image-upload",
      tooltip: tooltips.imageUpload || t("menu.imageUpload"),
    },
    {
      Icon: Video,
      command: () => setMediaUploader(assoc("video", true)),
      optionName: "video-upload",
      tooltip: tooltips.videoUpload || t("menu.videoUpload"),
    },
    {
      Icon: MediaVideo,
      command: () => setIsEmbedModalOpen(true),
      optionName: "video-embed",
      tooltip: tooltips.videoEmbed || t("menu.videoEmbed"),
    },
  ],
  right: [
    {
      Icon: Undo,
      command: () => editor.chain().focus().undo().run(),
      active: false,
      disabled: !editor.can().undo(),
      optionName: "undo",
      tooltip: tooltips.undo || t("menu.undo"),
    },
    {
      Icon: Redo,
      command: () => editor.chain().focus().redo().run(),
      active: false,
      disabled: !editor.can().redo(),
      optionName: "redo",
      tooltip: tooltips.redo || t("menu.redo"),
    },
  ],
});

export const FONT_SIZE_OPTIONS = [
  { label: "Heading 1", value: 1, key: "h1" },
  { label: "Heading 2", value: 2, key: "h2" },
  { label: "Heading 3", value: 3, key: "h3" },
  { label: "Paragraph", value: 0, key: "body2" },
];

export const TABLE_ACTIONS = ({ editor }) => [
  {
    label: t("table.insertRow"),
    command: () => editor.commands.addRowAfter(),
  },
  {
    label: t("table.insertColumn"),
    command: () => editor.commands.addColumnAfter(),
  },
  {
    label: t("table.deleteRow"),
    command: () => editor.chain().focus().deleteRow().run(),
  },
  {
    label: t("table.deleteColumn"),
    command: () => editor.chain().focus().deleteColumn().run(),
  },
  {
    label: t("table.mergeSplit"),
    command: () => editor.chain().focus().mergeOrSplit().run(),
  },
  {
    label: t("table.toggleHeaderRow"),
    command: () => editor.chain().focus().toggleHeaderRow().run(),
  },
  {
    label: t("table.toggleHeaderColumn"),
    command: () => editor.chain().focus().toggleHeaderColumn().run(),
  },
  {
    label: t("table.delete"),
    command: () => editor.commands.deleteTable(),
  },
];
