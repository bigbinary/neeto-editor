import { ADD_ON_OPTIONS } from "constants/common";

import {
  Paragraph,
  TextH1,
  TextH2,
  ListDot,
  ListNumber,
  Blockquote,
  Image,
  Code,
  Smiley,
  Minus,
  Video,
  Email,
} from "neetoicons";
import { validateYouTubeUrl, validateVimeoUrl } from "utils/embeds";

export const MENU_ITEMS = {
  PARAGRAPH: {
    optionName: ADD_ON_OPTIONS.FONT_SIZE,
    title: "Paragraph",
    description: "Add a plain text block.",
    Icon: Paragraph,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("paragraph").run();
    },
  },
  H1: {
    optionName: ADD_ON_OPTIONS.FONT_SIZE,
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
    optionName: ADD_ON_OPTIONS.FONT_SIZE,
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
  LIST_ORDERED: {
    optionName: ADD_ON_OPTIONS.LIST_ORDERED,
    title: "Numbered list",
    description: "Add a list with numbering.",
    Icon: ListNumber,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  LIST_BULLETS: {
    optionName: ADD_ON_OPTIONS.LIST_BULLETS,
    title: "Bulleted list",
    description: "Add an list bullets.",
    Icon: ListDot,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  BLOCKQUOTE: {
    optionName: ADD_ON_OPTIONS.BLOCKQUOTE,
    title: "Blockquote",
    description: "Add a quote.",
    Icon: Blockquote,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  IMAGE: {
    optionName: ADD_ON_OPTIONS.IMAGE_UPLOAD,
    title: "Image",
    description: "Add an image.",
    Icon: Image,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).run(),
  },
  CODE: {
    optionName: ADD_ON_OPTIONS.CODE_BLOCK,
    title: "Code block",
    description: "Add a code block with syntax highlighting.",
    Icon: Code,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  EMOJI: {
    optionName: ADD_ON_OPTIONS.EMOJI,
    title: "Emoji",
    description: "Add an emoji.",
    Icon: Smiley,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent("::").run();
    },
  },
  DIVIDER: {
    optionName: ADD_ON_OPTIONS.DIVIDER,
    title: "Divider",
    description: "Add an horizontal line to separate sections.",
    Icon: Minus,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
  VIDEO: {
    optionName: ADD_ON_OPTIONS.VIDEO_EMBED,
    title: "Embed Youtube/Vimeo",
    description: "Embed a video from major services.",
    Icon: Video,
    command: ({ editor, range }) => {
      const embedURL = prompt("Please enter Youtube/Vimeo embed URL.");

      const validatedUrl =
        validateYouTubeUrl(embedURL) || validateVimeoUrl(embedURL);

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
  MENTION: {
    optionName: ADD_ON_OPTIONS.MENTION,
    title: "Mention",
    description: "Mention a user.",
    Icon: Email,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent("@").run();
    },
  },

  // placeholder item when no matching results found
  NO_RESULT: {
    title: "No results",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
    },
  },
};
