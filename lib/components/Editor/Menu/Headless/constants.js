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
} from "neetoicons";
import { assoc } from "ramda";

export const MENU_OPTIONS = (editor, setMediaUploader, onClickAttachment) => [
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
    Icon: Highlight,
    command: () => editor.chain().focus().toggleHighlight().run(),
    active: editor.isActive("highlight"),
    optionName: "highlight",
  },
  {
    Icon: Quote,
    command: () => editor.chain().focus().toggleBlockquote().run(),
    active: editor.isActive("blockquote"),
    optionName: "block-quote",
  },
  {
    Icon: Code,
    command: () => editor.chain().focus().toggleCode().run(),
    active: editor.isActive("code"),
    optionName: "code",
  },
  {
    Icon: ListDot,
    command: () => editor.chain().focus().toggleBulletList().run(),
    active: editor.isActive("bulletList"),
    optionName: "bullet-list",
  },
  {
    Icon: ListNumber,
    command: () => editor.chain().focus().toggleOrderedList().run(),
    active: editor.isActive("orderedList"),
    optionName: "ordered-list",
  },
  {
    Icon: File,
    command: () => onClickAttachment(),
    optionName: "attachments",
  },
  {
    Icon: ImageUpload,
    command: () => setMediaUploader(assoc("image", true)),
    optionName: "image-upload",
  },
  {
    Icon: MediaVideo,
    command: () => setMediaUploader(assoc("video", true)),
    optionName: "video-upload",
  },
  {
    Icon: Smiley,
    command: () => {},
    optionName: "emoji",
  },
  {
    Icon: Undo,
    command: () => editor.chain().focus().undo().run(),
    disabled: !editor.can().undo(),
    optionName: "undo",
  },
  {
    Icon: Redo,
    command: () => editor.chain().focus().redo().run(),
    disabled: !editor.can().redo(),
    optionName: "redo",
  },
];
