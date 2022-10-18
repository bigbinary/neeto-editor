import {
  Paragraph,
  TextH1,
  TextH2,
  ListDot,
  ListNumber,
  Blockquote,
  ImageUpload,
  Code,
  Smiley,
  Minus,
  Video,
  Text,
  Notes,
  File,
} from "neetoicons";

import { EDITOR_OPTIONS } from "constants/common";
import {
  validateYouTubeUrl,
  validateLoomUrl,
  validateVimeoUrl,
} from "utils/embeds";

export const MENU_ITEMS = {
  PARAGRAPH: {
    optionName: EDITOR_OPTIONS.PARAGRAPH,
    title: "Paragraph",
    description: "Add a plain text block.",
    Icon: Paragraph,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("paragraph").run();
    },
  },
  H1: {
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
  H2: {
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
  H3: {
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
  H4: {
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
  H5: {
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
  H6: {
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
  LIST_ORDERED: {
    optionName: EDITOR_OPTIONS.LIST_ORDERED,
    title: "Numbered list",
    description: "Add a list with numbering.",
    Icon: ListNumber,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  LIST_BULLETS: {
    optionName: EDITOR_OPTIONS.LIST_BULLETS,
    title: "Bulleted list",
    description: "Add a list with bullets.",
    Icon: ListDot,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  BLOCKQUOTE: {
    optionName: EDITOR_OPTIONS.BLOCKQUOTE,
    title: "Blockquote",
    description: "Add a quote.",
    Icon: Blockquote,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  IMAGE: {
    optionName: EDITOR_OPTIONS.IMAGE_UPLOAD,
    title: "Image",
    description: "Add an image.",
    Icon: ImageUpload,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).run(),
  },
  ATTACHMENTS: {
    optionName: EDITOR_OPTIONS.ATTACHMENTS,
    title: "Attachments",
    description: "Add an attachment.",
    Icon: File,
    command: () => {}, //TODO
  },
  CODE: {
    optionName: EDITOR_OPTIONS.CODE_BLOCK,
    title: "Code block",
    description: "Add a code block with syntax highlighting.",
    Icon: Code,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  EMOJI: {
    optionName: EDITOR_OPTIONS.EMOJI,
    title: "Emoji",
    description: "Add an emoji.",
    Icon: Smiley,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent("::").run();
    },
  },
  DIVIDER: {
    optionName: EDITOR_OPTIONS.DIVIDER,
    title: "Divider",
    description: "Add an horizontal line to separate sections.",
    Icon: Minus,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
  VIDEO: {
    optionName: EDITOR_OPTIONS.VIDEO_EMBED,
    title: "Embed Youtube/Loom/Vimeo",
    description: "Embed a video from major services.",
    Icon: Video,
    command: ({ editor, range }) => {
      const embedURL = prompt("Please enter Youtube/Loom/Vimeo embed URL.");

      const validatedUrl =
        validateYouTubeUrl(embedURL) ||
        validateLoomUrl(embedURL) ||
        validateVimeoUrl(embedURL);

      if (validatedUrl) {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setExternalVideo({ src: validatedUrl })
          .run();
      } else {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .insertContent("#invalid")
          .run();
      }
    },
  },
  PASTE_UNFORMATTED: {
    optionName: EDITOR_OPTIONS.PASTE_UNFORMATTED,
    title: "Paste Unformatted",
    description: "Paste by removing all styles.",
    Icon: Notes,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).pasteUnformatted().run(),
  },

  // placeholder item when no matching results found
  NO_RESULT: {
    title: "No results",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
    },
  },
};
