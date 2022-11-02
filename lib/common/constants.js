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

  // ADDON EDITOR OPTIONS
  HIGHLIGHT: "highlight",
  EMOJI: "emoji",
  CODE_BLOCK: "code-block",
  BLOCKQUOTE: "block-quote",
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

export const URL_REGEXP =
  /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

export const YOUTUBE_URL_REGEXP =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/;

export const VIMEO_URL_REGEXP =
  /((?:http|https):\/\/)?(www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|(?:manage\/)?videos?\/|)(\d+)(?:(?:\/|\?h=)(\w+))?(?:|\/\?)/;

export const LOOM_URL_REGEXP =
  /((?:http|https):\/\/)?(www\.)?loom\.com\/(share|embed)\/((?:\w|\d)*)\/?(?:\?(?:t=)?(\d+)?)?/;
