import { pluck } from "ramda";

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
  CODE: "code",

  // ADDON EDITOR OPTIONS
  CODE_BLOCK: "code-block",
  BLOCKQUOTE: "block-quote",
  ATTACHMENTS: "attachments",
  UNDO: "undo",
  REDO: "redo",
  HIGHLIGHT: "highlight",
  EMOJI: "emoji",
  IMAGE_UPLOAD: "image-upload",
  IMAGE_UPLOAD_UNSPLASH: "image-upload-unsplash",
  VIDEO_UPLOAD: "video-upload",
  DIVIDER: "divider",
  VIDEO_EMBED: "video-embed",
  PASTE_UNFORMATTED: "paste-unformatted",
  TABLE: "table",
  TEXT_COLOR: "text-color",
};

export const UNSPLASH_BASE_URL = "https://api.unsplash.com/search/photos";

export const DIRECT_UPLOAD_ENDPOINT = "/api/direct_uploads";

export const URL_REGEXP =
  /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

export const YOUTUBE_URL_REGEXP =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S*?)(\?[^#]*)?$/;

export const VIMEO_URL_REGEXP =
  /((?:http|https):\/\/)?(www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|(?:manage\/)?videos?\/|)(\d+)(?:(?:\/|\?h=)(\w+))?(?:|\/\?)(\?[^#]*)?/;

export const LOOM_URL_REGEXP =
  /((?:http|https):\/\/)?(www\.)?loom\.com\/(share|embed)\/([a-f0-9]{32})(?:\?sid=([a-f0-9-]{36}))?(?:\?t=(\d+))?(\?[^#]*)?/;

export const NEETO_RECORD_URL_REGEXP =
  /((?:http|https):\/\/)?(www\.)?[a-zA-Z0-9-]+\.(neetorecord\.com)\/(watch)\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/;

export const COMBINED_REGEX = new RegExp(
  pluck("source", [
    YOUTUBE_URL_REGEXP,
    VIMEO_URL_REGEXP,
    LOOM_URL_REGEXP,
    NEETO_RECORD_URL_REGEXP,
  ]).join("|"),
  "g"
);

export const EDITOR_SIZES = { MEDIUM: "medium", LARGE: "large" };
