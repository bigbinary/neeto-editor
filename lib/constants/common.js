export const EDITOR_CONTENT_CLASSNAME = "neeto-editor-content";

export const EDITOR_PADDING_SIZE = 12;

export const EDITOR_BORDER_SIZE = 1;

export const EDITOR_LINE_HEIGHT = 21;

export const UNSPLASH_BASE_URL = "https://api.unsplash.com/search/photos";

export const EDITOR_OPTIONS = {
  // DEFAULT EDITOR OPTIONS
  BOLD: "bold",
  ITALIC: "italic",
  UNDERLINE: "underline",
  STRIKETHROUGH: "strike",
  LINK: "link",
  PARAGRAPH: "paragraph",
  H1: "h1",
  H2: "h2",
  H3: "h3",
  LIST_BULLETS: "bullet-list",
  LIST_ORDERED: "ordered-list",
  CODE_BLOCK: "code-block",
  BLOCKQUOTE: "block-quote",
  ATTACHMENTS: "attachments",

  // ADDON EDITOR OPTIONS
  HIGHLIGHT: "highlight",
  EMOJI: "emoji",
  IMAGE_UPLOAD: "image-upload",
  IMAGE_UPLOAD_UNSPLASH: "image-upload-unsplash",
  DIVIDER: "divider",
  VIDEO_EMBED: "video-embed",
  PASTE_UNFORMATTED: "paste-unformatted",
};

export const FONT_SIZE_OPTIONS = [
  { label: "H1", value: 1 },
  { label: "H2", value: 2 },
  { label: "H3", value: 3 },
];

export const DIRECT_UPLOAD_ENDPOINT = "/api/direct_uploads";

export const CODE_BLOCK_REGEX = /<pre><code>([\S\s]*?)<\/code><\/pre>/gim;
