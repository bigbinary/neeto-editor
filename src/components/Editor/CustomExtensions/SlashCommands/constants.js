import { noop } from "neetocommons/pure";
import {
  Paragraph,
  TextH1,
  TextH2,
  ListDot,
  ListNumber,
  Blockquote,
  ImageUpload,
  CodeBlock,
  Smiley,
  Minus,
  Video,
  Text,
  Notes,
  MediaVideo,
  NeetoChangelog,
} from "neetoicons";

import { EDITOR_OPTIONS } from "common/constants";

export const MENU_ITEMS = [
  {
    optionName: EDITOR_OPTIONS.PARAGRAPH,
    title: "Paragraph",
    description: "Add a plain text block.",
    Icon: Paragraph,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("paragraph").run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.H1,
    title: "H1",
    description: "Add a big heading.",
    Icon: TextH1,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.H2,
    title: "H2",
    description: "Add a sub-heading.",
    Icon: TextH2,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.H3,
    title: "H3",
    description: "Add a sub-heading of level 3.",
    Icon: Text,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.H4,
    title: "H4",
    description: "Add a sub-heading of level 4.",
    Icon: Text,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 4 })
        .run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.H5,
    title: "H5",
    description: "Add a sub-heading of level 5.",
    Icon: Text,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 5 })
        .run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.H6,
    title: "H6",
    description: "Add a sub-heading of level 6.",
    Icon: Text,
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 6 })
        .run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.LIST_ORDERED,
    title: "Numbered list",
    description: "Add a list with numbering.",
    Icon: ListNumber,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.LIST_BULLETS,
    title: "Bulleted list",
    description: "Add a list with bullets.",
    Icon: ListDot,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.IMAGE_UPLOAD,
    title: "Image",
    description: "Add an image.",
    Icon: ImageUpload,
    command: noop,
  },
  {
    optionName: EDITOR_OPTIONS.VIDEO_UPLOAD,
    title: "Video",
    description: "Add a video.",
    Icon: Video,
    command: noop,
  },
  {
    optionName: EDITOR_OPTIONS.BLOCKQUOTE,
    title: "Blockquote",
    description: "Add a quote.",
    Icon: Blockquote,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.CODE_BLOCK,
    title: "Code block",
    description: "Add a code block with syntax highlighting.",
    Icon: CodeBlock,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.EMOJI,
    title: "Emoji",
    description: "Add an emoji.",
    Icon: Smiley,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent("::").run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.DIVIDER,
    title: "Divider",
    description: "Add an horizontal line to separate sections.",
    Icon: Minus,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.VIDEO_EMBED,
    title: "Embed Youtube/Loom/Vimeo",
    description: "Embed a video from major services.",
    Icon: MediaVideo,
    command: noop,
  },
  {
    optionName: EDITOR_OPTIONS.PASTE_UNFORMATTED,
    title: "Paste Unformatted",
    description: "Paste by removing all styles.",
    Icon: Notes,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).pasteUnformatted().run(),
  },
  {
    optionName: EDITOR_OPTIONS.TABLE,
    title: "Table",
    description: "Add a table",
    Icon: NeetoChangelog,
    command: ({ editor, range }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run(),
  },
];

export const NO_RESULT_MENU_ITEM = {
  title: "No results",
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).run();
  },
};
