import i18n from "i18next";
import { findBy, noop } from "neetocist";
import {
  TextBold,
  TextItalic,
  Underline,
  TextCross,
  Highlight,
  Quote,
  Code,
  ListDot,
  ListNumber,
  ImageUpload,
  MediaVideo,
  Undo,
  Redo,
  Smiley,
  File,
  Video,
  NeetoChangelog,
  CodeBlock,
} from "neetoicons";
import { assoc } from "ramda";

const { t } = i18n;

export const createMenuOptions = ({
  editor,
  tooltips,
  setMediaUploader,
  handleUploadAttachments,
  isEmojiPickerActive,
  setIsEmojiPickerActive,
  setIsEmbedModalOpen,
}) => [
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
  {
    Icon: Quote,
    command: () => editor.chain().focus().toggleBlockquote().run(),
    active: editor.isActive("blockquote"),
    optionName: "block-quote",
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
  {
    Icon: ListDot,
    command: () => editor.chain().focus().toggleBulletList().run(),
    active: editor.isActive("bulletList"),
    optionName: "bullet-list",
    tooltip: tooltips.bulletList || t("menu.bulletedList"),
  },
  {
    Icon: ListNumber,
    command: () => editor.chain().focus().toggleOrderedList().run(),
    active: editor.isActive("orderedList"),
    optionName: "ordered-list",
    tooltip: tooltips.orderedList || t("menu.orderedList"),
  },
  {
    Icon: File,
    command: handleUploadAttachments,
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
  {
    Icon: Smiley,
    command: noop,
    optionName: "emoji",
    tooltip: tooltips.emoji || t("menu.emoji"),
    isActive: isEmojiPickerActive,
    setActive: setIsEmojiPickerActive,
  },
  {
    Icon: NeetoChangelog,
    command: () =>
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run(),
    optionName: "table",
    tooltip: tooltips.table || t("menu.table"),
  },
  {
    Icon: Undo,
    command: () => editor.chain().focus().undo().run(),
    disabled: !editor.can().undo(),
    optionName: "undo",
    tooltip: tooltips.undo || t("menu.undo"),
  },
  {
    Icon: Redo,
    command: () => editor.chain().focus().redo().run(),
    disabled: !editor.can().redo(),
    optionName: "redo",
    tooltip: tooltips.redo || t("menu.redo"),
  },
];

export const buildMenuOptions = ({
  tooltips,
  editor,
  options,
  setMediaUploader,
  handleUploadAttachments,
  isEmojiPickerActive,
  setIsEmojiPickerActive,
  setIsEmbedModalOpen,
}) => {
  const menuOptions = createMenuOptions({
    editor,
    tooltips,
    setMediaUploader,
    handleUploadAttachments,
    isEmojiPickerActive,
    setIsEmojiPickerActive,
    setIsEmbedModalOpen,
  });

  return options
    .map(option => findBy({ optionName: option }, menuOptions))
    .filter(Boolean);
};
