import { EDITOR_OPTIONS } from "common/constants";
import { t } from "i18next";
import { noop } from "neetocist";
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
  Column,
} from "neetoicons";

export const MENU_ITEMS = [
  {
    optionName: EDITOR_OPTIONS.PARAGRAPH,
    title: t("neetoEditor.menu.normalText"),
    description: t("neetoEditor.menu.normalTextDescription"),
    Icon: Paragraph,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("paragraph").run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.H1,
    title: t("neetoEditor.menu.h1"),
    description: t("neetoEditor.menu.h1Description"),
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
    title: t("neetoEditor.menu.h2"),
    description: t("neetoEditor.menu.h2Description"),
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
    title: t("neetoEditor.menu.h3"),
    description: t("neetoEditor.menu.h3Description"),
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
    title: t("neetoEditor.menu.h4"),
    description: t("neetoEditor.menu.h4Description"),
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
    title: t("neetoEditor.menu.h5"),
    description: t("neetoEditor.menu.h5Description"),
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
    title: t("neetoEditor.menu.h6"),
    description: t("neetoEditor.menu.h6Description"),
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
    title: t("neetoEditor.menu.numberedList"),
    description: t("neetoEditor.menu.numberedListDescription"),
    Icon: ListNumber,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.LIST_BULLETS,
    title: t("neetoEditor.menu.bulletList"),
    description: t("neetoEditor.menu.bulletListDescription"),
    Icon: ListDot,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.IMAGE_UPLOAD,
    title: t("neetoEditor.menu.image"),
    description: t("neetoEditor.menu.imageDescription"),
    Icon: ImageUpload,
    command: noop,
  },
  {
    optionName: EDITOR_OPTIONS.VIDEO_UPLOAD,
    title: t("neetoEditor.menu.video"),
    description: t("neetoEditor.menu.videoDescription"),
    Icon: Video,
    command: noop,
  },
  {
    optionName: EDITOR_OPTIONS.BLOCKQUOTE,
    title: t("neetoEditor.menu.blockQuote"),
    description: t("neetoEditor.menu.blockQuoteDescription"),
    Icon: Blockquote,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.CODE_BLOCK,
    title: t("neetoEditor.menu.codeBlock"),
    description: t("neetoEditor.menu.codeDescription"),
    Icon: CodeBlock,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.EMOJI,
    title: t("neetoEditor.menu.emoji"),
    description: t("neetoEditor.menu.emojiDescription"),
    Icon: Smiley,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertContent("::").run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.DIVIDER,
    title: t("neetoEditor.menu.divider"),
    description: t("neetoEditor.menu.dividerDescription"),
    Icon: Minus,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
  {
    optionName: EDITOR_OPTIONS.VIDEO_EMBED,
    title: t("neetoEditor.menu.embed"),
    description: t("neetoEditor.menu.embedDescription"),
    Icon: MediaVideo,
    command: noop,
  },
  {
    optionName: EDITOR_OPTIONS.PASTE_UNFORMATTED,
    title: t("neetoEditor.menu.pasteUnformatted"),
    description: t("neetoEditor.menu.pasteUnformattedDescription"),
    Icon: Notes,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).pasteUnformatted().run(),
  },
  {
    optionName: EDITOR_OPTIONS.TABLE,
    title: t("neetoEditor.menu.table"),
    description: t("neetoEditor.menu.tableDescription"),
    Icon: Column,
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
  title: t("neetoEditor.menu.noResults"),
  command: ({ editor, range }) => {
    editor.chain().focus().deleteRange(range).run();
  },
};
